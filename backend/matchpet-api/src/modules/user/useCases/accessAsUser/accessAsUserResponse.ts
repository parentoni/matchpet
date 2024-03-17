import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

/**
 *
 *  Access as user use case response, returns error or token
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type AccessAsUserResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, {token: string}>
