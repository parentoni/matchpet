import { User } from "../domain/user";
import { Either } from "../../../shared/core/Result";
import { IUserPersistant } from "../../../shared/infra/database/models/User";
import { AppStatsResponseSuccess } from "../../app/useCases/stats/AppStatsResponse";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";

export type RepositoryBaseResult<T> = Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, T>>;
export interface IUserRepo {
  exists: ({ filter }: { filter: Partial<IUserPersistant> }) => RepositoryBaseResult<boolean>;
  find_one: ({ filter }: { filter: Partial<IUserPersistant> }) => RepositoryBaseResult<User>;
  create: ({ dto }: { dto: User }) => Promise<Either<CommonUseCaseResult.UnexpectedError, string>>;
  getActiveUsers: (props: { limit?: number; skip?: number }) => RepositoryBaseResult<User[]>;
  aggregateStats: () => Promise<Either<CommonUseCaseResult.UnexpectedError, AppStatsResponseSuccess>>;
  allUsers: ({skip, size}: {skip?:number, size?:number}) => Promise<Either<CommonUseCaseResult.UnexpectedError, User[]>>;

}
