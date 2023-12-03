import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

interface UserDescriptionProps {
  value: string;
}

export class UserDescription extends ValueObject<UserDescriptionProps> {
  private static MAX_LENGTH = 1500;
  private static MIN_LENGTH = 0;

  get value(): string {
    return this.props.value;
  }

  private static validate(description: string): Either<GuardError | CommonUseCaseResult.InvalidValue, string> {
    const guardResult = Guard.againstNullOrUndefined(description, "ANIMAL_DESCRIPTION");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const trimedString = description.trim();
    if (trimedString.length < this.MAX_LENGTH && trimedString.length > this.MIN_LENGTH) {
      return right(trimedString);
    }

    return left(
      CommonUseCaseResult.InvalidValue.create({
        location: `${UserDescription.name}.${this.validate.name}`,
        variable: "USER_DESCRIPTION",
        errorMessage: `User description length must be between ${this.MIN_LENGTH} and ${this.MAX_LENGTH} characters.`
      })
    );
  }

  public static create(props: UserDescriptionProps): Either<GuardError | CommonUseCaseResult.InvalidValue, UserDescription> {
    const validateResult = this.validate(props.value);
    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(new UserDescription({ value: validateResult.value }));
  }
}
