import { AppError } from "../../../../shared/core/Response/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Left, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export interface IUserName {
  first_name: string;
  last_name: string;
}

type IUserNameResponse = Either<CommonUseCaseResult.InvalidValue, UserName>;

export class UserName extends ValueObject<IUserName> {
  get value(): string {
    return this.props.first_name + " " + this.props.last_name;
  }

  get first_name(): string {
    return this.props.first_name;
  }

  get last_name(): string {
    return this.props.last_name;
  }

  public static create(props: IUserName): IUserNameResponse {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: props.first_name, argumentName: "FIRST_NAME" },
      { argument: props.last_name, argumentName: "LAST_NAME" }
    ]);

    if (guardResponse.isLeft()) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: `${guardResponse.value.error.errorMessage}`,
          variable: "NAME",
          location: `${UserName.name}.${UserName.create.name}`
        })
      );
    }

    return right(
      new UserName({
        first_name: TextUtils.sanitize(props.first_name),
        last_name: TextUtils.sanitize(props.last_name)
      })
    );
  }
}
