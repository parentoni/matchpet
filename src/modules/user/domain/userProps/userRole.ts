import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export enum USER_ROLE {
  common = 0,
  client = 1,
  admin = 2
}

export interface IUserRole {
  value: number;
}

export type IUserRoleResponse = Either<CommonUseCaseResult.InvalidValue, UserRole>;
export class UserRole extends ValueObject<IUserRole> {
  get value(): USER_ROLE {
    return this.props.value as USER_ROLE;
  }

  public static create(props: IUserRole): IUserRoleResponse {
    if (Object.values(USER_ROLE).includes(props.value)) {
      return right(new UserRole(props));
    }

    return left(
      CommonUseCaseResult.InvalidValue.create({
        errorMessage: `Invalid role number: ${props.value}`,
        location: `${UserRole.name}.${this.create.name}`,
        variable: "ROLE_NUMBER"
      })
    );
  }
}
