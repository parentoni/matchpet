import { Guard, GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { AnimalTrait } from "./animal/AnimalTraits";
import { SpecieTrait } from "./animal/SpecieTraits";

export interface SpecieProps {
  SpecieName: string;
  SpecieTraits: SpecieTrait[];
}

export class Specie extends AggregateRoot<SpecieProps> {
  get traits() {
    return this.props.SpecieTraits;
  }

  get name() {
    return this.props.SpecieName;
  }

  private constructor(props: SpecieProps, id?: UniqueGlobalId) {
    super(props, id);
  }

  public static create(props: SpecieProps, id?: UniqueGlobalId): Either<GuardError, Specie> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.SpecieName, argumentName: "SPECIE_NAME" }]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    } else {
      return right(
        new Specie(
          {
            SpecieName: props.SpecieName.toString(),
            SpecieTraits: props.SpecieTraits
          },
          id
        )
      );
    }
  }

  public validateArrayOfAnimalTraits(animalTraits: AnimalTrait[]): Either<CommonUseCaseResult.InvalidValue, AnimalTrait[]> {
    const traits: AnimalTrait[] = []
    for (const specieTrait of this.traits) {
      const found = animalTraits.find((el) => el._id.equals(specieTrait.specieTraitId));
      if (!(!!found) && !specieTrait.optional) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${Specie.name}.${this.validateArrayOfAnimalTraits.name}`,
            errorMessage: `Obriogatory trait ${specieTrait.name} not provided.`,
            variable: "TRAIT_ID"
          })
        );
      }

      if (!!found) {
        let optionFound = false
        for (const option of specieTrait.options) {

          if (option.optionId.toValue() === found.value) {
            optionFound = true
          }
        }

        
        if (optionFound === false) {
          return left(CommonUseCaseResult.InvalidValue.create({
            location: `${Specie.name}.${this.validateArrayOfAnimalTraits.name}`,
            errorMessage: `Value "${found.value}}" not found in options list "${JSON.stringify(specieTrait.options)}".`,
            variable: "VALUE"
          }))
        }

        traits.push(found)
      }

      
    }

    return right(traits);
  }
}
