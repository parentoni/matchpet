import { UploadAnimalImageUseCase } from "./uploadAnimalImageUseCase";
import { UploadAnimalImageController } from "./uploadAnimalImageController";
import { s3Bucket } from "../../infra/aws";

const uploadAnimalImageUseCase = new UploadAnimalImageUseCase(s3Bucket)
const uploadAnimalImageController = new UploadAnimalImageController(uploadAnimalImageUseCase)

export {uploadAnimalImageController}