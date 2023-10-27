import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../../shared/core/Result";
import { IBucketUpload } from "../IBucket";

import { Secrets } from "../../../../../config/secretsManager";
export class S3Bucket implements IBucketUpload {
  protected BUCKET = "matchpetong";
  protected REGION = "sa-east-1";
  protected client = new S3Client({
    credentials: {
      accessKeyId: Secrets.getSecret("AWS_S3_ACCESS_KEY"),
      secretAccessKey: Secrets.getSecret("AWS_S3_PRIVATE_ACCESS_KEY")
    },
    region: this.REGION
  });

  async upload(file: Buffer, location: string): Promise<Either<CommonUseCaseResult.UnexpectedError, string>> {
    const command = new PutObjectCommand({
      Bucket: this.BUCKET,
      Key: location,
      Body: file
    });

    try {
      const response = await this.client.send(command);
      return right(`https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/${location}`);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
