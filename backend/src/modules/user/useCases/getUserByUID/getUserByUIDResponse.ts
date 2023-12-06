import { Either } from "../../../../shared/core/Result";
import { BaseError, GenericError, IBaseError } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { User } from "../../domain/user";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type GetUserByUIDResponse = Promise<Either<CommonUseCaseResult.InvalidValue | GenericError<IBaseError>, IUserPersistant>>;
