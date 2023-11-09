import { Guard, GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface IUserLastLoginProps {
  date: Date;
}

export class UserLastLogin extends ValueObject<IUserLastLoginProps> {
  get value(): Date {
    return this.props.date;
  }

  private static validate(props: IUserLastLoginProps): Either<GuardError, Date> {
    const guardResult = Guard.againstNullOrUndefined(props.date, "USER_LAST_LOGIN_DATE");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(props.date);
  }

  public static create(props: IUserLastLoginProps): Either<GuardError, UserLastLogin> {
    const validateResult = this.validate(props);
    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(
      new UserLastLogin({
        date: validateResult.value
      })
    );
  }
}
