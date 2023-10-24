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
import { Timestamp } from "../../../shared/core/Timestamp";
import { UserPhone } from "./userProps/userPhone";
import { Location } from "../../../shared/core/Location";
export interface UserProps {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  verified: boolean;
  phone: UserPhone;
  location: Location.GeoJsonPoint;
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

  get phone(): UserPhone {
    return this.props.phone;
  }

  get role(): USER_ROLE {
    return this.props.role.value;
  }

  get verified(): boolean {
    return this.props.verified;
  }

  get location(): Location.GeoJsonPoint {
    return this.props.location
  }

  private constructor(props: UserProps, id?: UniqueGlobalId) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueGlobalId): UserResponse {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "USER_NAME" },
      { argument: props.email, argumentName: "USER_EMAIL" },
      { argument: props.password, argumentName: "USER_PASWORD" },
      { argument: props.phone, argumentName: "USER_PHONE" },
      { argument: props.role, argumentName: "USER_ROLE" },
      { argument: props.verified, argumentName: "USER_VERIFIED" },
      {argument: props.location, argumentName: "USER_LOCATION"}
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
