import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

/**
 * Possible responses for get all users UseCase
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type GetAllUsersResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, IUserPersistant[]>
