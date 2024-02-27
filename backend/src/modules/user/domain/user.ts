import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserEmail } from "./userProps/userEmail";
import { UserId } from "./userProps/userId";
import { UserPassword } from "./userProps/userPassword";
import { Either, left, right } from "../../../shared/core/Result";
import { UserCreated } from "./events/userCreated";
import { UserDisplayName } from "./userProps/userDisplayName";
import { USER_ROLE, UserRole } from "./userProps/userRole";
import { UserPhone } from "./userProps/userPhone";
import { Location } from "../../../shared/core/Location";
import { UserLastLogin } from "./userProps/userLastLogin";
import { UserLogin } from "./events/userLogin";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { UserName } from "./userProps/userName";
import { UserImage } from "./userProps/userImage";
import { UserDescription } from "./userProps/userDescription";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";

export interface UserProps {
  displayName: UserDisplayName;
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  verified: boolean;
  phone: UserPhone;
  location: Location.GeoJsonPoint;
  completedAdoptions: number;
  inAdoption: number;
  lastLogin: UserLastLogin;

  image?: UserImage;
  description?: UserDescription;
}

type UserResponse = Either<CommonUseCaseResult.InvalidValue, User>;

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

  get displayName(): UserDisplayName {
    return this.props.displayName;
  }

  get userName(): UserName {
    return this.props.username;
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
    return this.props.location;
  }

  get completedAdoptions(): number {
    return this.props.completedAdoptions;
  }

  get inAdoption(): number {
    return this.props.inAdoption;
  }

  get lastLogin(): UserLastLogin {
    return this.props.lastLogin;
  }

  get image(): UserImage | undefined {
    return this.props.image;
  }
  public get description(): UserDescription | undefined {
    return this.props.description;
  }

  public updateCompletedAdoptions(num: number): void {
    this.props.completedAdoptions = num;
  }

  public updateInAdoption(num: number): void {
    this.props.inAdoption = num;
  }

  public logActivity() {
    this.addDomainEvent(new UserLogin(this));
    DomainEvents.dispatchEventsForAggregate(this._id);
  }

  private constructor(props: UserProps, id?: UniqueGlobalId) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueGlobalId): UserResponse {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.displayName, argumentName: "USER_DISPLAYNAME" },
      { argument: props.email, argumentName: "USER_EMAIL" },
      { argument: props.password, argumentName: "USER_PASWORD" },
      { argument: props.phone, argumentName: "USER_PHONE" },
      { argument: props.role, argumentName: "USER_ROLE" },
      { argument: props.verified, argumentName: "USER_VERIFIED" },
      { argument: props.location, argumentName: "USER_LOCATION" },
      { argument: props.lastLogin, argumentName: "USER_LASTLOGIN" }
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

    const userIsNew = !!id === false;

    if (userIsNew) {
      user.addDomainEvent(new UserCreated(user));
    }

    return right(user);
  }
}
