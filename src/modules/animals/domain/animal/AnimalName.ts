import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, right, left } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class AnimalName extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value;
  }

  private static validate(name: string): Either<CommonUseCaseResult.InvalidValue, string> {
    const formatedName = name.trim();
    if (formatedName.length <= 100) {
      return right(formatedName);
    } else {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${AnimalName.name}.${this.validate}`,
          variable: "ANIMAL_NAME",
          errorMessage: "Animal name length must be between boundaries: 100 => name "
        })
      );
    }
  }

  public static create(props: { value: string }): Either<GuardError | CommonUseCaseResult.InvalidValue, AnimalName> {
    const guardResult = Guard.againstNullOrUndefined(props.value, "ANIMAL_NAME");

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const validate = this.validate(props.value);
    if (validate.isLeft()) {
      return left(validate.value);
    }

    return right(new AnimalName(props));
  }
}
