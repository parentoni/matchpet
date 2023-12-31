import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type EditUserResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IUserPersistant>;
