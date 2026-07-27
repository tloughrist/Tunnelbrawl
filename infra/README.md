# Tunnel Brawl — Infrastructure (AWS CDK)

Infrastructure-as-code for the production deployment of [Tunnel Brawl](../README.md), in
`us-east-1`.

## What it provisions

- **VPC** — 2 AZs, public subnets only, **no NAT gateway** (Fargate tasks use a public IP for
  egress; a NAT would add ~$32/mo).
- **ECS Fargate** service (ARM64/Graviton, 0.5 vCPU / 1 GB) running the Rails API image from ECR,
  behind a public **Application Load Balancer** with an HTTPS listener (ACM cert) and HTTP→HTTPS
  redirect. Health-checked on `/up`. Solid Queue runs inside Puma (`SOLID_QUEUE_IN_PUMA`).
- **S3 + CloudFront** for the React SPA (private bucket via Origin Access Control, SPA fallback to
  `index.html`).
- Reads `RAILS_MASTER_KEY` and `DATABASE_URL` from **Secrets Manager**.

The Rails image (ECR `tunnelbrawl-api`), the ACM certificate, and the two secrets are managed
outside this stack and referenced by ARN/name (see `bin/app.ts`).

## Prerequisites (one-time)

1. AWS credentials for account `961494160524` (`aws login`), and the account CDK-bootstrapped.
2. ACM certificate (us-east-1) covering `tunnelbrawl.timloughrist.com` + `api.tunnelbrawl.timloughrist.com`, **validated** (DNS CNAMEs added at the registrar).
3. The two Secrets Manager secrets populated (`tunnelbrawl/RAILS_MASTER_KEY`, `tunnelbrawl/DATABASE_URL`).
4. The Rails image pushed to ECR (`tunnelbrawl-api:latest`).

## Deploy

```bash
cd infra
npm install
npx cdk diff       # review
npx cdk deploy     # ~10-15 min (CloudFront is the slow part)
```

Stack outputs include:
- `ApiAlbDnsName` — CNAME `api.tunnelbrawl.timloughrist.com` → this
- `SpaCloudFrontDomain` — CNAME `tunnelbrawl.timloughrist.com` → this
- `SpaBucketName` / `SpaDistributionId` — targets for uploading the built SPA

## Publish the frontend

```bash
cd ../frontend
npm run build
aws s3 sync dist/ "s3://<SpaBucketName>/" --delete
aws cloudfront create-invalidation --distribution-id <SpaDistributionId> --paths '/*'
```

## Tear down

`npx cdk destroy` removes everything in this stack (the ECR repo, ACM cert, and secrets are managed
separately and are left in place).
