import { UseCase } from "../../../../shared/core/UseCase";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { Specie } from "../../domain/Specie";
import { GuardError } from "../../../../shared/core/Guard";
import { ISpeciePersistent } from "../../../../shared/infra/database/models/Specie";
import { SpeciesMapper } from "../../mappers/SpeciesMapper";

export type GetAllSpeciesResponse = Either<CommonUseCaseResult.UnexpectedError | GuardError, ISpeciePersistent[]>;
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

    const persistentArray: ISpeciePersistent[] = []

    for (const specie of response.value) {
      const mapperResult = SpeciesMapper.toPersistent(specie)
      if (mapperResult.isLeft()) {
        return left(mapperResult.value)
      }
      
      persistentArray.push(mapperResult.value)
    }
    
    return right(persistentArray);
  }
}
