import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { ICategoryPersistent } from "../../../shared/infra/database/models/Category";
import { Category } from "../domain/Category";

export interface ICategoryRepo {
  save(category:Category): Promise<Either<CommonUseCaseResult.UnexpectedError, ICategoryPersistent>>
}