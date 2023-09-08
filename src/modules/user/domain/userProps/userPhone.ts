import { Guard, GuardError, GuardResponse } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
const parseBrazilianTelefone = require("telefone/parse");
export interface UserPhoneProps {
  value: string;
}

export class UserPhone extends ValueObject<UserPhoneProps> {
  get value(): string {
    return this.props.value;
  }

  private static validate(number: string): Either<GuardError, string> {
    const guardExists = Guard.againstNullOrUndefined(number, "PHONE_NUMBER");

    if (guardExists.isLeft()) {
      return left(guardExists.value);
    }

    const parsedNumber = parseBrazilianTelefone(number, { apenasCelular: true });

    const guardIsValid = Guard.againstNullOrUndefined(parsedNumber, "PHONE_NUMBER");

    if (guardIsValid.isLeft()) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${UserPhone.name}.${this.validate.name}`,
          variable: "USER_PHONE",
          errorMessage: `Invalid cellphone number: ${number}`
        })
      );
    }

    return right(parsedNumber);
  }

  public static create(props: UserPhoneProps): Either<GuardError, UserPhone> {
    const validate = this.validate(props.value);

    if (validate.isLeft()) {
      return left(validate.value);
    }

    return right(new UserPhone({ value: validate.value }));
  }
}
