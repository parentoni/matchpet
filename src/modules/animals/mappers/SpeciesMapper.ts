import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { ISpeciePersistent, ISpecieTraitOptionsPersistent, ISpecieTraitPersistent } from "../../../shared/infra/database/models/Specie";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { Specie } from "../domain/Specie";
import { SpecieTraitOption } from "../domain/specie/SpecieTraitOption";
import { SpecieTrait } from "../domain/specie/SpecieTrait";
import { SpecieTraits } from "../domain/specie/SpecieTraits";

export class SpeciesMapper {
  static toDomain(persistent: ISpeciePersistent): Either<GuardError | CommonUseCaseResult.InvalidValue, Specie> {
    const specieTraits = SpecieTraits.createFromPersistent(persistent.traits)

    if (specieTraits.isLeft()) {
      return left(specieTraits.value)
    }

    const specie = Specie.create({ SpecieName: persistent.name, SpecieTraits: specieTraits.value }, new UniqueGlobalId(persistent._id));
    if (specie.isLeft()) {
      return left(specie.value);
    }

    return right(specie.value);
  }

  static toPersistent(specie: Specie): Either<CommonUseCaseResult.UnexpectedError, ISpeciePersistent> {
    try {
      const persistentSpecieTraitsArray: ISpecieTraitPersistent[] = [];

      for (const trait of specie.traits.list) {
        const options: ISpecieTraitOptionsPersistent[] = [];
        for (const domain_option of trait.options) {
          options.push({
            _id: domain_option.optionId.toValue(),
            name: domain_option.props.name
          });
        }


        persistentSpecieTraitsArray.push({
          ...trait.props,
          options: options,
          _id: trait.specieTraitId.toValue(),
          print: trait.print.value,
          category: trait.category.toValue()
        });
      }

      return right({
        _id: specie.id.toValue(),
        name: specie.name,
        traits: persistentSpecieTraitsArray
      });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
