import { IBaseRepository, RepositoryBaseResult } from "../../../shared/core/IBaseRepositoty";
import { UserProps } from "../domain/user";
import { User } from "../domain/user";
import { AppError } from "../../../shared/core/Response/AppError";
import { Either } from "../../../shared/core/Result";
import { GenericError } from "../../../shared/core/Response/Error";
import { IBaseError } from "../../../shared/core/Response/Error";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { AppStatsResponseSuccess } from "../../app/useCases/stats/AppStatsResponse";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";

export interface IUserRepo {
  exists: ({ filter }: { filter: Partial<IUserPersistant> }) => RepositoryBaseResult<boolean>;
  find_one: ({ filter }: { filter: Partial<IUserPersistant> }) => RepositoryBaseResult<User>;
  create: ({ dto }: { dto: User }) => Promise<Either<AppError.UnexpectedError | GenericError<IBaseError>, string>>;
  getActiveUsers: (props: { limit?: number; skip?: number }) => RepositoryBaseResult<User[]>;
  aggregateStats: () => Promise<Either<CommonUseCaseResult.UnexpectedError,AppStatsResponseSuccess>>;
}
