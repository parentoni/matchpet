import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { CategoryModel, ICategoryPersistent } from "../../../../shared/infra/database/models/Category";
import { Category } from "../../domain/Category";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { ICategoryRepo } from "../ICategoryRepo";

export class CategoryRepo implements ICategoryRepo {
  async save(category: Category): Promise<Either<CommonUseCaseResult.UnexpectedError, ICategoryPersistent>> {
    try {
      const persistentCategory = CategoryMapper.toPersistent(category);
      await CategoryModel.findByIdAndUpdate(category.id.toValue(), persistentCategory, { upsert: true });
      return right(persistentCategory);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async exists(id: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue | GuardError, Category>> {
    try {
      const result = await CategoryModel.findById(id);
      if (!!result) {
        const mapperResult = CategoryMapper.toDomain(result.toJSON());
        if (mapperResult.isLeft()) {
          return left(mapperResult.value);
        }

        return right(mapperResult.value);
      }

      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${CategoryRepo.name}.${this.exists.name}`,
          variable: "CATEGORY_ID",
          errorMessage: "There was no category found with given id"
        })
      );
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async getAll(): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Category[]>> {
    try {
      const categorysArray: Category[] = [];
      const results = await CategoryModel.find({});

      for (const result of results) {
        const mapperResult = CategoryMapper.toDomain(result.toObject());
        if (mapperResult.isLeft()) {
          return left(mapperResult.value);
        }

        categorysArray.push(mapperResult.value);
      }

      return right(categorysArray);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
