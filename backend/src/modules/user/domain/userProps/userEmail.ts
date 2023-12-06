import { ValueObject } from "../../../../shared/domain/ValueObject";
import { Either, left, right } from "../../../../shared/core/Result";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";

interface IUserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private static isValid(email: string): boolean {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
  }

  public static create(props: IUserEmailProps): Either<CommonUseCaseResult.InvalidValue, UserEmail> {
    const propsResult = Guard.againstNullOrUndefined(props.value, "email");

    if (propsResult.isLeft()) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: propsResult.value.error.errorMessage,
          location: `${UserEmail.name}.${UserEmail.create.name}`,
          variable: "EMAIL"
        })
      );
      // return Result.fail<UserEmail>(`[UserEmail(create)]: ${propsResult.getErrorValue()}`);
    }
    const valid = this.isValid(props.value);

    if (valid) {
      return right(new UserEmail({ value: TextUtils.sanitize(props.value) }));
    } else {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: `Invalid email ${props.value}`,
          location: `${UserEmail.name}.${UserEmail.create.name}`,
          variable: "EMAIL"
        })
      );
    }
  }

  public mask(): string {
    const [name, domain] = this.value.split("@");
    const result = Guard.againstNullOrUndefinedBulk([
      { argumentName: "EMAIL_NAME", argument: name },
      { argumentName: "EMAIL_DOMAIN", argument: domain }
    ]);

    if (result.isRight()) {
      const maskedName = name.substring(0, 3) + "***" + name.substring(name.length - 3, name.length);
      return maskedName + "@" + domain;
    }

    return this.value;
  }
}
