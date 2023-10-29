import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { EditAnimalUseCase } from "./EditAnimalUseCase";

export class EditAnimalErrors {
   static get unathorized() {
    return CommonUseCaseResult.Forbidden.create({
    location: `${EditAnimalUseCase.name}.execute`,
    errorMessage: "Trying to edit non propietary animal.",
    variable: "DONATOR_ID"
    })
  }
  static get dbError() {
    return CommonUseCaseResult.InvalidValue.create({
    location: `${EditAnimalUseCase.name}.execute`,
    errorMessage: "Invalid edit value.",
    variable: "DONATOR_ID"
    })
  }
}