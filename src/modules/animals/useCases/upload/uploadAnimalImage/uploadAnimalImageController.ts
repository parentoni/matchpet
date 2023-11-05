import formidable from "formidable";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { UploadAnimalImageUseCase } from "./uploadAnimalImageUseCase";
import { Request } from "express";
import { UploadedFile } from "express-fileupload";
export class UploadAnimalImageController extends BaseController<Request> {
  private uploadAnimalImageUseCase: UploadAnimalImageUseCase;

  constructor(uploadAnimalImageUseCase: UploadAnimalImageUseCase) {
    super();
    this.uploadAnimalImageUseCase = uploadAnimalImageUseCase;

    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      try {

        const response = await uploadAnimalImageUseCase.execute({
          file: (req.files?.image as UploadedFile).data,
          fileName: (req.files?.image as UploadedFile).name
        });
        if (response.isLeft()) {
          return this.errorHandler(res, response.value);
        }

        return this.ok(res, { location: response.value });
      } catch (error) {
        this.fail(res, error as Error);
      }
    });
  }
}
