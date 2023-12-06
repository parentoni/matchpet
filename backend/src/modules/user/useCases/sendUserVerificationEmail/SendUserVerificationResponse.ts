import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type SendUserVerificationEmailResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, string>

