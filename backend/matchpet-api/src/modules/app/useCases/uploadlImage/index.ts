import { UploadAnimalImageUseCase } from "./uploadImageUseCase";
import { UploadAnimalImageController } from "./uploadImageController";
import { s3Bucket } from "../../../animals/infra/aws";

const uploadAnimalImageUseCase = new UploadAnimalImageUseCase(s3Bucket);
const uploadAnimalImageController = new UploadAnimalImageController(uploadAnimalImageUseCase);

export { uploadAnimalImageController, uploadAnimalImageUseCase };
