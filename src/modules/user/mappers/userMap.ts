import { GenericError, IBaseError } from "../../../shared/core/Response/Error";
import { right, Either, left } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { User } from "../domain/user";
import { UserEmail } from "../domain/userProps/userEmail";
import { UserName } from "../domain/userProps/userName";
import { UserPassword } from "../domain/userProps/userPassword";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserRole } from "../domain/userProps/userRole";
import { UserPhone } from "../domain/userProps/userPhone";
import { Location } from "../../../shared/core/Location";

export class UserMap {
  static async toDomain(persistance: IUserPersistant): Promise<Either<GenericError<IBaseError> | CommonUseCaseResult.InvalidValue, User>> {
    const userPasswordOrError = UserPassword.create({
      value: persistance.password,
      hashed: true
    });
    const userNameOrError = UserName.create({
      first_name: persistance.first_name,
      last_name: persistance.last_name
    });
    const userEmailOrError = UserEmail.create({ value: persistance.email });
    const userRoleOrError = UserRole.create({ value: persistance.role });
    const userPhoneNumberOrError = UserPhone.create({ value: persistance.phone_number });
    const userLocationOrError = Location.GeoJsonPoint.create({ coordinates: persistance.location.coordinates });
    const userIdOrError = UniqueGlobalId.createExisting(persistance._id);

    const result = EitherUtils.combine([
      userPasswordOrError,
      userRoleOrError,
      userPhoneNumberOrError,
      userEmailOrError,
      userLocationOrError,
      userIdOrError
    ]);

    if (result.isRight()) {
      const userOrError = User.create(
        {
          name: userNameOrError.getRight(),
          email: userEmailOrError.getRight(),
          password: userPasswordOrError.getRight(),
          role: userRoleOrError.getRight(),
          phone: userPhoneNumberOrError.getRight(),
          verified: persistance.verified,
          location: userLocationOrError.getRight(),
          inAdoption: persistance.in_adoption,
          completedAdoptions: persistance.completed_adoptions
        },
        userIdOrError.getRight()
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
        first_name: user.name?.first_name,
        last_name: user.name?.last_name,
        _id: user.id.toValue(),
        role: user.role,
        verified: user.verified,
        phone_number: user.phone.value,
        location: {
          type: user.location.props.type,
          coordinates: user.location.coordinates
        },
        completed_adoptions: user.completedAdoptions,
        in_adoption: user.inAdoption
      });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
