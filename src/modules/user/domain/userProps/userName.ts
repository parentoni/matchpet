import { AppError } from "../../../../shared/core/Response/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Left, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { TextUtils } from "../../../../shared/utils/TextUtils";

export interface IUserName {
  display_name: string;
}

type IUserNameResponse = Either<CommonUseCaseResult.InvalidValue, UserName>;

export class UserName extends ValueObject<IUserName> {
  get value(): string {
    return this.props.display_name;
  }

  get displayName(): string {
    return this.props.display_name;
  }

  public static create(props: IUserName): IUserNameResponse {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: props.display_name, argumentName: "DISPLAY_NAME_NAME" }
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
        display_name: props.display_name.trim()
      })
    );
  }
}
