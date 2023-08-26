import { AppError } from "../../../shared/core/Response/AppError";
import { GenericError, IBaseError } from "../../../shared/core/Response/Error";
import { right, Either, left } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { User } from "../domain/user";
import { UserCpf } from "../domain/userProps/userCpf";
import { UserEmail } from "../domain/userProps/userEmail";
import { UserName } from "../domain/userProps/userName";
import { UserPassword } from "../domain/userProps/userPassword";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserRole } from "../domain/userProps/userRole";


export class UserMap {
  static async toDomain(
    persistance: IUserPersistant
  ): Promise<Either<GenericError<IBaseError> | CommonUseCaseResult.InvalidValue, User>> {
    const userEmailOrError = UserEmail.create({ value: persistance.email });
    const userPasswordOrError = UserPassword.create({ value: persistance.password, hashed: true });
    const userCpfOrError = UserCpf.create({ value: persistance.cpf });
    const userNameOrError = UserName.create({
      first_name: persistance.first_name,
      last_name: persistance.last_name
    });
    const userRoleOrError = UserRole.create({value: persistance.role})

    const result = EitherUtils.combine([userCpfOrError, userPasswordOrError, userCpfOrError, userRoleOrError]);

    if (result.isRight()) {
      const userOrError = User.create({
        name: userNameOrError.value as UserName,
        email: userEmailOrError.value as UserEmail,
        password: userPasswordOrError.value as UserPassword,
        role: userRoleOrError.value as UserRole,
        cpf: userCpfOrError.isRight() ? userCpfOrError.value : undefined,
        verified: persistance.verified
      }, new UniqueGlobalId(persistance._id));

      if (userOrError.isRight()) {
        return right(userOrError.value);
      } else {
        return left(userOrError.value);
      }
    }

    return left(result.value);
  }

  static async toPersistant(
    user: User
  ): Promise<Either<AppError.UnexpectedError, IUserPersistant>> {
    let password = null;

    if (!!user.password === true) {
      if (user.password?.isAlreadyHashed()) {
        password = user.password;
      } else {
        password = await user.password?.getHashedValue();
      }
    }
    try {
      return right({
        password: user.password?.value,
        email: user.email?.value,
        cpf: user.cpf,
        first_name: user.name?.first_name,
        last_name: user.name?.last_name,
        _id: user.id.toValue(),
        role: user.role,
        verified: user.verified
      });
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }
}
