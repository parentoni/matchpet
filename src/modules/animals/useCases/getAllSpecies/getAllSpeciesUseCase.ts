import { UseCase } from "../../../../shared/core/UseCase";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { Specie } from "../../domain/Specie";
import { GuardError } from "../../../../shared/core/Guard";

export type GetAllSpeciesResponse = Either<CommonUseCaseResult.UnexpectedError | GuardError, Specie[]>;
export class GetAllSpeciesUseCase implements UseCase<null, GetAllSpeciesResponse> {
  private speciesRepo: ISpecieRepo;
  constructor(speciesRepo: ISpecieRepo) {
    this.speciesRepo = speciesRepo;
  }

  async execute(request: null): Promise<GetAllSpeciesResponse> {
    const response = await this.speciesRepo.all();
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(response.value);
  }
}
