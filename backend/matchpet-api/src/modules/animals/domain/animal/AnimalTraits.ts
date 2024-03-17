import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { WatchList } from "../../../../shared/domain/WatchList";
import { AnimalTrait, AnimalTraitProps } from "./AnimalTrait";

export class AnimalTraits extends WatchList<AnimalTrait> {
  constructor(traits: AnimalTrait[]) {
    super(traits);
  }

  compareItems(a: AnimalTrait, b: AnimalTrait): boolean {
    return a.equals(b);
  }

  public static create(traits: AnimalTrait[]) {
    return new AnimalTraits(traits);
  }

  public static createFromPersistent(props: AnimalTraitProps[]): Either<GuardError, AnimalTraits> {
    const array: AnimalTrait[] = [];
    try {
      for (const prop of props) {
        const result = AnimalTrait.create({
          _id: prop._id.toString(),
          value: prop.value
        });
        if (result.isLeft()) {
          return left(result.value);
        }

        array.push(result.value);
      }

      return right(AnimalTraits.create(array));
    } catch (error) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${AnimalTraits.name}.${this.createFromPersistent.name}`,
          variable: "PROPS",
          errorMessage: "The given array of traits is invalid."
        })
      );
    }
  }

  public get persistentValue(): { _id: string; value: string }[] {
    const array: { _id: string; value: string }[] = [];
    for (const animalTrait of this.list) {
      array.push({ _id: animalTrait._id.toValue(), value: animalTrait.value });
    }
    return array;
  }
}
