import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface AnimalTraitProps {
  _id: string;
  value: string;
}

export class AnimalTrait extends ValueObject<AnimalTraitProps> {
  get value(): string {
    return this.props.value;
  }

  get _id(): UniqueGlobalId {
    if (typeof this.props._id === "string") {
      return new UniqueGlobalId(this.props._id);
    }

    return this.props._id;
  }

  private static validate(props: AnimalTraitProps): Either<GuardError, AnimalTraitProps> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props._id, argumentName: "SPECIE_TRAIT_ID" },
      { argument: props.value, argumentName: "value" }
    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(props);
  }

  public static create(props: AnimalTraitProps): Either<GuardError, AnimalTrait> {
    const validateResult = this.validate(props);
    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(
      new AnimalTrait({
        ...props
      })
    );
  }
}
