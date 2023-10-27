import mongoose from "mongoose";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepositoty";
import { User } from "../domain/user";
import { left, right } from "../../../shared/core/Result";
import { AppError } from "../../../shared/core/Response/AppError";
import { UserMap } from "../mappers/userMap";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { GenericError, IBaseError } from "../../../shared/core/Response/Error";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { Either } from "../../../shared/core/Result";
import { IUserRepo } from "./IUserRepo";
export class UserRepo implements IUserRepo {
  private models: mongoose.Models;

  constructor(models: mongoose.Models) {
    this.models = models;
  }

  public async exists({ filter }: { filter: Partial<IUserPersistant> }): RepositoryBaseResult<boolean> {
    const UserM = this.models.user;
    try {
      const testUser = await UserM.findOne(filter);
      if (testUser) {
        return right(!!testUser === true);
      } else {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            errorMessage: "Invalid User find params",
            location: `${UserRepo.name}.${this.exists.name}`,
            variable: "PARAMS"
          })
        );
      }
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }

  public async find_one({ filter }: { filter: Partial<IUserPersistant> }): RepositoryBaseResult<User> {
    const UserM = this.models.user;
    try {
      const testUser = await UserM.findOne(filter);
      if (!testUser) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${UserRepo.name}.${this.find_one.name}`,
            variable: "FILTER",
            errorMessage: "No user registeres were found with given filter"
          })
        );
      }
      const userOrError = await UserMap.toDomain(testUser);

      if (userOrError.isRight()) {
        return right(userOrError.value);
      } else {
        return left(userOrError.value);
      }
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }

  //TODO PARAMETERS IN OBJECT
  public async create({ dto }: { dto: User }): Promise<Either<AppError.UnexpectedError | GenericError<IBaseError>, string>> {
    const UserM = this.models.user;
    const userInPersistanceFormat = await UserMap.toPersistant(dto);

    if (userInPersistanceFormat.isLeft()) {
      return left(userInPersistanceFormat.value);
    }
    const exists = await UserM.exists({ _id: dto.id.toValue() });

    if (!!exists) {
      const resp = await UserM.findByIdAndUpdate(dto.id.toValue(), userInPersistanceFormat.value);
      // console.log(resp)
      // console.log(userInPersistanceFormat)
      return right(dto.id.toValue());
    }

    const created = await UserM.create(userInPersistanceFormat);
    return right(created._id);
  }
}
