import { Guard } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { ValidUrl } from "../../../../../shared/core/ValidUrl";
import { Specie } from "../../../domain/Specie";
import { SpecieTraitOption } from "../../../domain/specie/SpecieTraitOption";
import { SpecieTrait } from "../../../domain/specie/SpecieTrait";
import { SpeciesMapper } from "../../../mappers/SpeciesMapper";
import { ISpecieRepo } from "../../../repository/ISpeciesRepo";
import { CreateSpeciesDto } from "./createSpeciesDTO";
import { CreateSpeciesResponse } from "./createSpeciesResponse";
import { SpecieTraitPrint } from "../../../domain/specie/SpecieTraitPrint";
import { SpecieTraits } from "../../../domain/specie/SpecieTraits";
import { ICategoryRepo } from "../../../repository/ICategoryRepo";
import { UniqueGlobalId } from "../../../../../shared/domain/UniqueGlobalD";
import { EitherUtils } from "../../../../../shared/utils/EitherUtils";

export class CreateSpecieUseCase implements UseCase<CreateSpeciesDto, CreateSpeciesResponse> {
  private speciesRepo: ISpecieRepo;
  private categoryRepo: ICategoryRepo;
  constructor(speciesRepo: ISpecieRepo, categoryRepo:ICategoryRepo) {
    this.speciesRepo = speciesRepo;
    this.categoryRepo = categoryRepo;
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
      const printOrError = SpecieTraitPrint.create({value: trait.print})
      const category = UniqueGlobalId.createExisting(trait.category)

      const combineResult = EitherUtils.combine([printOrError, category])
      if (combineResult.isLeft()) {
        return left(combineResult.value)
      }

      const exixts = await this.categoryRepo.exists(trait.category)
      if (exixts.isLeft()) {
        return left(exixts.value)
      }
      
      const options: SpecieTraitOption[] = [];

      // Create options
      for (const string_option of trait.options) {
        const optionOrError = SpecieTraitOption.create({
          name: string_option
        });

        if (optionOrError.isLeft()) {
          return left(optionOrError.value);
        }

        options.push(optionOrError.value);
      }


      const traitOrError = SpecieTrait.create({
        ...trait,
        options: options,
        optional: Boolean(trait.optional),
        print: printOrError.getRight(),
        category: category.getRight()
      });
      if (traitOrError.isLeft()) {
        return left(traitOrError.value);
      } else {
        speciesTraits.push(traitOrError.value);
      }
    }

    const specie = Specie.create({
      SpecieName: request.SpecieName,
      SpecieTraits: SpecieTraits.create(speciesTraits)
    });
    if (specie.isLeft()) {
      return left(specie.value);
    }

    const repoResult = await this.speciesRepo.save(specie.value);

    if (repoResult.isLeft()) {
      return left(repoResult.value);
    }

    const specieInPersistent = SpeciesMapper.toPersistent(specie.value)
    if (specieInPersistent.isLeft()) {
      return left(specieInPersistent.value)
    }

    return right(specieInPersistent.value);
  }
}
