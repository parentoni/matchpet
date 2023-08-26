import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { Specie } from "../../domain/Specie";
import { SpecieTrait } from "../../domain/animal/SpecieTraits";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { CreateSpeciesDto } from "./createSpeciesDTO";
import { CreateSpeciesResponse } from "./createSpeciesResponse";

export class CreateSpecieUseCase implements UseCase<CreateSpeciesDto, CreateSpeciesResponse> {
  private speciesRepo: ISpecieRepo;

  constructor(speciesRepo: ISpecieRepo) {
    this.speciesRepo = speciesRepo;
  }

  async execute(request: CreateSpeciesDto): Promise<CreateSpeciesResponse> {
    const speciesTraits: SpecieTrait[] = [];

    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: request.SpecieName, argumentName: "SPECIE_NAME" },
      { argument: request.SpecieTraits, argumentName: "SPECIE_TRAITS" }
    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    for (const trait of request.SpecieTraits) {
      const urlOrError = ValidUrl.create({ value: trait.svg });

      if (urlOrError.isLeft()) {
        return left(urlOrError.value);
      }

      const traitOrError = SpecieTrait.create({
        ...trait,
        svg: urlOrError.value,
        optional: Boolean(trait.optional)
      });
      if (traitOrError.isLeft()) {
        return left(traitOrError.value);
      } else {
        speciesTraits.push(traitOrError.value);
      }
    }

    const specie = Specie.create({
      SpecieName: request.SpecieName,
      SpecieTraits: speciesTraits
    });
    if (specie.isLeft()) {
      return left(specie.value);
    }

    const repoResult = await this.speciesRepo.save(specie.value);
    console.log(specie.value.id.toValue());
    if (repoResult.isLeft()) {
      return left(repoResult.value);
    }

    return right(specie.value);
  }
}
