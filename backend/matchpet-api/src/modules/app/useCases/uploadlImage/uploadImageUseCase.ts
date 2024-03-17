import { randomUUID } from "crypto";
import { UseCase } from "../../../../shared/core/UseCase";
import { IBucketUpload } from "../../../animals/infra/aws/IBucket";
import { UploadAnimalImageDTO } from "./uploadImageDTO";
import { UploadAnimalImageResponse } from "./uploadImageResponse";
import { left, right } from "../../../../shared/core/Result";
import { Guard } from "../../../../shared/core/Guard";

export class UploadAnimalImageUseCase implements UseCase<UploadAnimalImageDTO, UploadAnimalImageResponse> {
  protected bucketService: IBucketUpload;

  constructor(bucketService: IBucketUpload) {
    this.bucketService = bucketService;
  }

  async execute(request: UploadAnimalImageDTO): Promise<UploadAnimalImageResponse> {
    const response = Guard.againstNullOrUndefinedBulk([
      { argument: request.file, argumentName: "IMAGE_FILE" },
      { argument: request.fileName, argumentName: "IMAGE_FILE_NAME" }
    ]);

    if (response.isLeft()) {
      return left(response.value);
    }

    const location = `animals/${randomUUID()}-${request.fileName}`;
    const serviceResponse = await this.bucketService.upload(request.file, location);
    if (serviceResponse.isLeft()) {
      return left(serviceResponse.value);
    }

    return right(serviceResponse.value);
  }
}
