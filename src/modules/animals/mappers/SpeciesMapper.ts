import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { ISpeciePersistent, ISpecieTraitPersistent } from "../../../shared/infra/database/models/Specie";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { Specie } from "../domain/Specie";
import { SpecieTrait } from "../domain/animal/SpecieTraits";

export class SpeciesMapper {
  static toDomain(persistent: ISpeciePersistent): Either<GuardError | CommonUseCaseResult.InvalidValue, Specie> {
    const specieTraitsArray: SpecieTrait[] = [];

    for (const option of persistent.traits) {
      const svgInUrl = ValidUrl.create({ value: option.svg });

      if (svgInUrl.isLeft()) {
        return left(svgInUrl.value);
      }

      const specieTrait = SpecieTrait.create({ ...option, svg: svgInUrl.value }, new UniqueGlobalId(String(option._id)));
      if (specieTrait.isLeft()) {
        return left(specieTrait.value);
      }

      console.log(specieTrait.value.specieTraitId.toValue(), option._id)
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

      for (const option of specie.traits) {
        persistentSpecieTraitsArray.push({
          ...option.props,
          svg: option.props.svg.value,
          _id: option.specieTraitId.toValue()
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
