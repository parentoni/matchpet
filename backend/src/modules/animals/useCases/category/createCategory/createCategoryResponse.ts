import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { ICategoryPersistent } from "../../../../../shared/infra/database/models/Category";

export type CreateCategoryResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ICategoryPersistent>;
