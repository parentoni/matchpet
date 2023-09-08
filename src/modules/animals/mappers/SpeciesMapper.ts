import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { ISpeciePersistent, ISpecieTraitOptionsPersistent, ISpecieTraitPersistent } from "../../../shared/infra/database/models/Specie";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { Specie } from "../domain/Specie";
import { SpecieTraitOption } from "../domain/animal/SpecieTraitOption";
import { SpecieTrait } from "../domain/animal/SpecieTraits";

export class SpeciesMapper {
  static toDomain(persistent: ISpeciePersistent): Either<GuardError | CommonUseCaseResult.InvalidValue, Specie> {
    const specieTraitsArray: SpecieTrait[] = [];

    for (const trait of persistent.traits) {
      const svgInUrl = ValidUrl.create({ value: trait.svg });

      if (svgInUrl.isLeft()) {
        return left(svgInUrl.value);
      }

      const options: SpecieTraitOption[] = [];

      for (const string_option of trait.options) {
        const optionOrError = SpecieTraitOption.create(
          {
            name: string_option.name
          },
          new UniqueGlobalId(string_option._id.toString())
        );

        if (optionOrError.isLeft()) {
          return left(optionOrError.value);
        }

        options.push(optionOrError.value);
      }

      const specieTrait = SpecieTrait.create({ ...trait, options: options, svg: svgInUrl.value }, new UniqueGlobalId(String(trait._id)));
      if (specieTrait.isLeft()) {
        return left(specieTrait.value);
      }

      console.log(specieTrait.value.specieTraitId.toValue(), trait._id);
      specieTraitsArray.push(specieTrait.value);
    }

    const specie = Specie.create({ SpecieName: persistent.name, SpecieTraits: specieTraitsArray }, new UniqueGlobalId(persistent._id));
    if (specie.isLeft()) {
      return left(specie.value);
    }

    return right(specie.value);
  }

  static toPersistent(specie: Specie): Either<CommonUseCaseResult.UnexpectedError, ISpeciePersistent> {
    try {
      const persistentSpecieTraitsArray: ISpecieTraitPersistent[] = [];

      for (const trait of specie.traits) {
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
          svg: trait.svg.value,
          _id: trait.specieTraitId.toValue()
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
