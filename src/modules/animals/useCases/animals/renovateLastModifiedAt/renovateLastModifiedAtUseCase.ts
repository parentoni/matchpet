import { differenceInDays } from "date-fns";
import { Guard } from "../../../../../shared/core/Guard";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { RenovateLastModifiedAtDTO } from "./renovateLastModifiedAtDTO";
import { RenovateLastModifiedAtResponse } from "./renovateLastModifiedAtResponse";
import { animalRepo } from "../../../repository";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Timestamp } from "../../../../../shared/core/Timestamp";

export class RenovateLastModifiedAtUseCase implements UseCase<RenovateLastModifiedAtDTO, RenovateLastModifiedAtResponse> {
  protected animalRepo: IAnimalRepo;
  protected DAYS_THRESHOLD = 7
  constructor (animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo
  }

  async execute(request: RenovateLastModifiedAtDTO): Promise<RenovateLastModifiedAtResponse> {
    const guardResponse = Guard.againstNullOrUndefined(request.animalId, "ANIMAL_ID")
    
    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    const repoReponse = await this.animalRepo.findById(request.animalId)

    if (repoReponse.isLeft()) {
      return left(repoReponse.value)
    }

    const animal = repoReponse.value

    const newLastModifiedDate = new Date()
    
    if (differenceInDays(newLastModifiedDate, animal.lastModifiedAt.value) < this.DAYS_THRESHOLD) {
      return left( CommonUseCaseResult.InvalidValue.create({
        errorMessage: `Cannot renovate animal with last_modified_at less than ${this.DAYS_THRESHOLD} days ago.`,
        variable: 'LAST_MODIFED_AT',
        location: `${RenovateLastModifiedAtUseCase.name}.${this.execute.name}`
      }))
    }

    repoReponse.value.props.lastModifiedAt = Timestamp.create(newLastModifiedDate)

    const response = await animalRepo.save(animal)

    if (response.isLeft()) {
      return left(response.value)
    }
    
    return right(null)
  }


}