import { RepositoryBaseResult } from "../../../shared/core/IBaseRepositoty";
import { User } from "../domain/user";
import { left, right } from "../../../shared/core/Result";
import { UserMap } from "../mappers/userMap";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { IUserPersistant, UserModel } from "../../../shared/infra/database/models/User";
import { Either } from "../../../shared/core/Result";
import { IUserRepo } from "./IUserRepo";
import { AppStatsResponseSuccess } from "../../app/useCases/stats/AppStatsResponse";

export class UserRepo implements IUserRepo {


  public async exists({ filter }: { filter: Partial<IUserPersistant> }): RepositoryBaseResult<boolean> {
    try {
      const testUser = await UserModel.findOne(filter);
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
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  public async find_one({ filter }: { filter: Partial<IUserPersistant> }): RepositoryBaseResult<User> {
    try {
      const testUser = await UserModel.findOne(filter);
      if (!testUser) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${UserRepo.name}.${this.find_one.name}`,
            variable: "FILTER",
            errorMessage: "No user registers were found with given filter"
          })
        );
      }
      const userOrError = await UserMap.toDomain(testUser.toObject());

      if (userOrError.isRight()) {
        return right(userOrError.value);
      } else {
        return left(userOrError.value);
      }
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  public async create({ dto }: { dto: User }): Promise<Either<CommonUseCaseResult.UnexpectedError, string>> {
    const userInPersistanceFormat = await UserMap.toPersistant(dto);

    if (userInPersistanceFormat.isLeft()) {
      return left(userInPersistanceFormat.value);
    }
    const exists = await UserModel.exists({ _id: dto.id.toValue() });

    if (!!exists) {
      await UserModel.findByIdAndUpdate(dto.id.toValue(), userInPersistanceFormat.value);
      return right(dto.id.toValue());
    }

    const created = await UserModel.create(userInPersistanceFormat.value);
    return right(created._id.toString());
  }

  public async getActiveUsers(props: { limit?: number; skip?: number }): RepositoryBaseResult<User[]> {
    const userArray: User[] = [];
    try {
      const result = await UserModel.find({
        in_adoption: { $gt: 0 },
        verified: true
      }).sort({ in_adoption: -1 });
      const userArray = await UserMap.toDomainBulk(result.map(el => el.toObject())); // Map mongo objects to js objects
      return right(userArray);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  public async aggregateStats(): Promise<Either<CommonUseCaseResult.UnexpectedError, AppStatsResponseSuccess>> {
    try {
      const result = await UserModel.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            in_adoption: { $sum: "$in_adoption" },
            completed_adoptions: { $sum: "$completed_adoptions" }
          }
        }
        // {
        //   $group: {
        //     _id: null,
        //     completed_adoptions: { $sum: "$completed_adoptions" }
        //   }
        // }
      ]);

      // console.log(result)
      return right({ in_adoption: result[0].in_adoption, completed_adoptions: result[0].completed_adoptions });
    } catch (e) {
      return left(CommonUseCaseResult.UnexpectedError.create(e));
    }
  }

  /**
   * get all users, with support for pagination
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public async allUsers(props: {skip?:number, size?:number}): Promise<Either<CommonUseCaseResult.UnexpectedError, User[]>> {

    //Try catch to handle mongo raising errors
    try {
      
      //Get all active users, considering  skip = 0, and size = 50 as defaults
      const result = await UserModel.find().skip(props.skip || 0).limit(props.size || 50)

      //transform persistent user into domain user
      const usersArray = await UserMap.toDomainBulk(result.map(el => el.toObject())) //Map mongo object to js object
      return right(usersArray)
    } catch (e) {
      return left(CommonUseCaseResult.UnexpectedError.create(e))
    }
  }

}
