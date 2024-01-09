import { CommonUseCaseResult } from "./Response/UseCaseError";
import { Either } from "./Result";
import { GenericError, IBaseError } from "./Response/Error";
import { UniqueGlobalId } from "../domain/UniqueGlobalD";
import { User } from "../../modules/user/domain/user";

export type RepositoryBaseInput<T> = { [x in keyof T]: any };
export type RepositoryBaseResult<U> = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, U>>;
export type RepositorySaveResult<U> = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, boolean>>;

export interface IBaseRepository<T> {
  exists: ({ filter }: { filter: Partial<RepositoryBaseInput<T>> }) => RepositoryBaseResult<any>;
  find_one: ({ filter }: { filter: Partial<RepositoryBaseInput<T>> }) => RepositoryBaseResult<any>;
  create: ({ dto }: { dto: User }) => RepositorySaveResult<any>;
}
