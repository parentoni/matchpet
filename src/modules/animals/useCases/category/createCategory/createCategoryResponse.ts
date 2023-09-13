import { GuardError } from "../../../../../shared/core/Guard";
import { Either } from "../../../../../shared/core/Result";
import { ICategoryPersistent } from "../../../../../shared/infra/database/models/Category";

export type CreateCategoryResponse = Either<GuardError, ICategoryPersistent>