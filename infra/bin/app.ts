#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TunnelbrawlStack } from "../lib/tunnelbrawl-stack";

const app = new cdk.App();

new TunnelbrawlStack(app, "TunnelbrawlStack", {
  // us-east-1 is required: the ACM cert lives there and CloudFront certs must be there.
  env: { account: "961494160524", region: "us-east-1" },
  certArn:
    "arn:aws:acm:us-east-1:961494160524:certificate/fa121e9a-a55d-4e02-a17b-1e4dc2af6a4e",
  apiDomain: "api.tunnelbrawl.timloughrist.com",
  spaDomain: "tunnelbrawl.timloughrist.com",
  ecrRepoName: "tunnelbrawl-api",
  tags: { project: "tunnelbrawl" },
});
