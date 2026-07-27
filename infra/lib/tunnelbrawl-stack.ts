import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export interface TunnelbrawlStackProps extends cdk.StackProps {
  /** ACM cert ARN (us-east-1) covering both the SPA and API domains. */
  certArn: string;
  /** e.g. api.tunnelbrawl.timloughrist.com */
  apiDomain: string;
  /** e.g. tunnelbrawl.timloughrist.com */
  spaDomain: string;
  /** ECR repo holding the Rails image. */
  ecrRepoName: string;
}

export class TunnelbrawlStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TunnelbrawlStackProps) {
    super(scope, id, props);

    const cert = acm.Certificate.fromCertificateArn(this, "Cert", props.certArn);
    const repo = ecr.Repository.fromRepositoryName(this, "ApiRepo", props.ecrRepoName);

    // Secrets are created out of band (see infra/README) and referenced by name.
    const masterKey = secretsmanager.Secret.fromSecretNameV2(this, "MasterKey", "tunnelbrawl/RAILS_MASTER_KEY");
    const databaseUrl = secretsmanager.Secret.fromSecretNameV2(this, "DatabaseUrl", "tunnelbrawl/DATABASE_URL");

    // --- Networking: public subnets only, NO NAT gateway (a NAT would add ~$32/mo).
    // Fargate tasks get a public IP for egress to Supabase + ECR, locked down to
    // inbound-from-ALB-only via security groups.
    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        { name: "public", subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
      ],
    });

    const cluster = new ecs.Cluster(this, "Cluster", { vpc });

    // --- Rails API: Fargate (ARM64/Graviton) behind a public ALB with HTTPS ---
    const api = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Api", {
      cluster,
      cpu: 512,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      runtimePlatform: {
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
      },
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repo, "latest"),
        containerPort: 3000,
        environment: {
          RAILS_ENV: "production",
          RAILS_LOG_TO_STDOUT: "1",
          RAILS_MAX_THREADS: "5",
          // Run the Solid Queue worker inside Puma — one service, no separate worker.
          SOLID_QUEUE_IN_PUMA: "true",
          FRONTEND_ORIGIN: `https://${props.spaDomain}`,
        },
        secrets: {
          RAILS_MASTER_KEY: ecs.Secret.fromSecretsManager(masterKey),
          DATABASE_URL: ecs.Secret.fromSecretsManager(databaseUrl),
        },
      },
      publicLoadBalancer: true,
      assignPublicIp: true,
      taskSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      certificate: cert, // HTTPS listener on 443
      redirectHTTP: true, // 80 -> 443
      circuitBreaker: { rollback: true },
      minHealthyPercent: 100,
      maxHealthyPercent: 200,
      healthCheckGracePeriod: cdk.Duration.seconds(60),
    });

    // Rails health endpoint; ALB pings this to gate traffic.
    api.targetGroup.configureHealthCheck({
      path: "/up",
      healthyHttpCodes: "200",
      interval: cdk.Duration.seconds(30),
      timeout: cdk.Duration.seconds(10),
    });
    // Faster deploys (default is 300s).
    api.targetGroup.setAttribute("deregistration_delay.timeout_seconds", "30");
    // Keep WebSocket connections open comfortably (ActionCable pings every ~3s anyway).
    api.loadBalancer.setAttribute("idle_timeout.timeout_seconds", "120");

    const scaling = api.service.autoScaleTaskCount({ minCapacity: 1, maxCapacity: 2 });
    scaling.scaleOnCpuUtilization("Cpu", { targetUtilizationPercent: 70 });

    // --- React SPA: private S3 bucket fronted by CloudFront ---
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new cloudfront.Distribution(this, "Cdn", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      domainNames: [props.spaDomain],
      certificate: cert,
      defaultRootObject: "index.html",
      // SPA fallback: let React Router handle deep links.
      errorResponses: [
        { httpStatus: 403, responseHttpStatus: 200, responsePagePath: "/index.html" },
        { httpStatus: 404, responseHttpStatus: 200, responsePagePath: "/index.html" },
      ],
    });

    // --- Outputs: the DNS targets you'll CNAME at your registrar, plus deploy targets ---
    new cdk.CfnOutput(this, "ApiAlbDnsName", {
      value: api.loadBalancer.loadBalancerDnsName,
      description: `CNAME ${props.apiDomain} -> this`,
    });
    new cdk.CfnOutput(this, "SpaCloudFrontDomain", {
      value: distribution.distributionDomainName,
      description: `CNAME ${props.spaDomain} -> this`,
    });
    new cdk.CfnOutput(this, "SpaBucketName", { value: siteBucket.bucketName });
    new cdk.CfnOutput(this, "SpaDistributionId", { value: distribution.distributionId });
  }
}
