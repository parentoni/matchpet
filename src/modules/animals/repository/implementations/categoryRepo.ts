import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { CategoryModel, ICategoryPersistent } from "../../../../shared/infra/database/models/Category";
import { Category } from "../../domain/Category";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { ICategoryRepo } from "../ICategoryRepo";

export class CategoryRepo implements ICategoryRepo {
  async save(category: Category): Promise<Either<CommonUseCaseResult.UnexpectedError, ICategoryPersistent>> {
    try {
      const persistentCategory = CategoryMapper.toPersistent(category)
      await CategoryModel.findByIdAndUpdate(category.id.toValue(), persistentCategory, {upsert: true})
      return right(persistentCategory)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }
  
}