import { Guard } from "../../../shared/core/Guard";
import { BaseError, GenericError, IBaseError } from "../../../shared/core/Response/Error";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserEmail } from "./userProps/userEmail";
import { UserId } from "./userProps/userId";
import { UserPassword } from "./userProps/userPassword";
import { Either, left, right } from "../../../shared/core/Result";
import { UserCreated } from "./events/userCreated";
import { UserCpf } from "./userProps/userCpf";
import { UserName } from "./userProps/userName";
import { USER_ROLE, UserRole } from "./userProps/userRole";

export interface UserProps {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  verified: boolean;
  cpf?: UserCpf;
}

type UserResponse = Either<GenericError<IBaseError>, User>;

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get name(): UserName {
    return this.props.name;
  }

  get cpf(): string | undefined {
    return this.props.cpf?.value;
  }

  get role(): USER_ROLE {
    return this.props.role.value
  }

  get verified(): boolean {
    return this.props.verified
  }

  private constructor(props: UserProps, id?: UniqueGlobalId) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueGlobalId): UserResponse {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "NAME" },
      { argument: props.email, argumentName: "EMAIL" },
      { argument: props.password, argumentName: "PASWORD" }
    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const user = new User(
      {
        ...props
      },
      id
    );


    return right(user);
  }
}
