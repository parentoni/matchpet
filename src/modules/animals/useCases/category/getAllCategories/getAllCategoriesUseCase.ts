import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { ICategoryPersistent } from "../../../../../shared/infra/database/models/Category";
import { CategoryMapper } from "../../../mappers/CategoryMapper";
import { ICategoryRepo } from "../../../repository/ICategoryRepo";
import { GetAllCategoriesResponse } from "./getAllCategoriesResponse";

export class GetAllCategoriesUseCase implements UseCase<void, GetAllCategoriesResponse>{
  protected categoryRepo: ICategoryRepo;
  constructor(categoryRepo:ICategoryRepo) {
    this.categoryRepo = categoryRepo
  }

  async execute(): Promise<GetAllCategoriesResponse> {
    const response = await this.categoryRepo.getAll()
    if (response.isLeft()) {
      return left(response.value)
    }

    const persistentArray: ICategoryPersistent[] = []
    for (const categorie of response.value) {
      persistentArray.push(CategoryMapper.toPersistent(categorie))
    }

    return right(persistentArray)

  }
}