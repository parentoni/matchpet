import { GenericError, IBaseError } from "../../../shared/core/Response/Error";
import { right, Either, left } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { User } from "../domain/user";
import { UserEmail } from "../domain/userProps/userEmail";
import { UserDisplayName } from "../domain/userProps/userDisplayName";
import { UserPassword } from "../domain/userProps/userPassword";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserRole } from "../domain/userProps/userRole";
import { UserPhone } from "../domain/userProps/userPhone";
import { Location } from "../../../shared/core/Location";
import { UserLastLogin } from "../domain/userProps/userLastLogin";
import { UserName } from "../domain/userProps/userName";
import { UserImage } from "../domain/userProps/userImage";
import { UserDescription } from "../domain/userProps/userDescription";

export class UserMap {
  static async toDomain(persistance: IUserPersistant): Promise<Either<CommonUseCaseResult.InvalidValue, User>> {
    const userPasswordOrError = UserPassword.create({
      value: persistance.password,
      hashed: true
    });

    const userDisplayNameOrError = UserDisplayName.create({
      display_name: persistance.display_name
    });

    const userEmailOrError = UserEmail.create({ value: persistance.email });
    const userRoleOrError = UserRole.create({ value: persistance.role });
    const userPhoneNumberOrError = UserPhone.create({ value: persistance.phone_number });
    const userLocationOrError = Location.GeoJsonPoint.create({ coordinates: persistance.location.coordinates });
    const userIdOrError = UniqueGlobalId.createExisting(persistance._id);
    const userLastLoginOrError = UserLastLogin.create({ date: persistance.last_login });
    const userNameOrError = UserName.create({ username: persistance.username });

    let image: undefined | UserImage;
    if (persistance.image) {
      const imageOrError = UserImage.create({ image: persistance.image });
      if (imageOrError.isLeft()) {
        return left(imageOrError.value);
      }
      image = imageOrError.value;
    }

    let description: undefined | UserDescription;
    if (persistance.description) {
      const descriptionOrError = UserDescription.create({ value: persistance.description });
      if (descriptionOrError.isLeft()) {
        return left(descriptionOrError.value);
      }

      description = descriptionOrError.value;
    }

    const result = EitherUtils.combine([
      userPasswordOrError,
      userRoleOrError,
      userPhoneNumberOrError,
      userEmailOrError,
      userLocationOrError,
      userIdOrError,
      userLastLoginOrError,
      userDisplayNameOrError,
      userNameOrError
    ]);

    if (result.isRight()) {
      const userOrError = User.create(
        {
          displayName: userDisplayNameOrError.getRight(),
          username: userNameOrError.getRight(),
          email: userEmailOrError.getRight(),
          password: userPasswordOrError.getRight(),
          role: userRoleOrError.getRight(),
          phone: userPhoneNumberOrError.getRight(),
          verified: persistance.verified,
          location: userLocationOrError.getRight(),
          inAdoption: persistance.in_adoption,
          completedAdoptions: persistance.completed_adoptions,
          lastLogin: userLastLoginOrError.getRight(),
          image,
          description
        },
        new UniqueGlobalId(userIdOrError.getRight().toValue().toString() as string)
      );

      if (userOrError.isRight()) {
        return right(userOrError.value);
      } else {
        return left(userOrError.value);
      }
    }

    return left(result.value);
  }

  static async toPersistant(user: User): Promise<Either<CommonUseCaseResult.UnexpectedError, IUserPersistant>> {
    let password = null;

    if (user.password?.isAlreadyHashed()) {
      password = user.password.value;
    } else {
      password = await user.password?.getHashedValue();
    }

    try {
      return right({
        password: password,
        email: user.email?.value,
        display_name: user.displayName.displayName,
        username: user.userName.value,
        _id: user.id.toValue(),
        role: user.role,
        verified: user.verified,
        phone_number: user.phone.value,
        location: {
          type: user.location.props.type,
          coordinates: user.location.coordinates
        },
        completed_adoptions: user.completedAdoptions,
        in_adoption: user.inAdoption,
        last_login: user.lastLogin.value,
        image: user.image?.value || "",
        description: user.description?.value || ""
      });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  static async toSafePersistent(user: User): Promise<Either<CommonUseCaseResult.UnexpectedError, IUserPersistant>> {
    const persistentResult = await this.toPersistant(user);
    if (persistentResult.isLeft()) {
      return left(persistentResult.value);
    }

    persistentResult.value.password = "CONFIDENTIAL";

    return right(persistentResult.value);
  }

  static async toDomainBulk(persistent: IUserPersistant[]): Promise<User[]> {
    const userA: User[] = [];
    if (persistent.length > 0) {
      for (const pers of persistent) {
        const result = await this.toDomain(pers);
        if (result.isRight()) {
          userA.push(result.value);
        }
      }
    }

    return userA;
  }
}
