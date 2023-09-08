import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { FindSpecieByIdResponse } from "./findSpecieByIdResponse";
import { FindSpecieByIdDTO } from "./findSpecieByIdDTO";

export class FindSpecieByIdUseCase implements UseCase<FindSpecieByIdDTO, FindSpecieByIdResponse> {
  private specieRepo: ISpecieRepo;
  constructor(specieRepo: ISpecieRepo) {
    this.specieRepo = specieRepo;
  }

  async execute(request: FindSpecieByIdDTO): Promise<FindSpecieByIdResponse> {
    try {
      const guardResult = Guard.againstNullOrUndefined(request.id, "ID");
      if (guardResult.isLeft()) {
        return left(guardResult.value);
      }

      const specie = await this.specieRepo.findById(request.id);
      if (specie.isLeft()) {
        return left(specie.value);
      }

      return right(specie.value);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
