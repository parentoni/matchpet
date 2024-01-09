import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { User } from "../../domain/user";

export type UpdateUserStatsResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, User>;
