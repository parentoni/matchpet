import { Guard } from "../../../../../shared/core/Guard";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { ValidUrl } from "../../../../../shared/core/ValidUrl";
import { Category } from "../../../domain/Category";
import { ICategoryRepo } from "../../../repository/ICategoryRepo";
import { CreateCategoryDTO } from "./createCategoryDTO";
import { CreateCategoryResponse } from "./createCategoryResponse";

export class CreateCategoryUseCase implements UseCase<CreateCategoryDTO, CreateCategoryResponse> {
  protected categoryRepo: ICategoryRepo
  constructor (repo: ICategoryRepo) {
    this.categoryRepo = repo
  }

  async execute(request: CreateCategoryDTO): Promise<CreateCategoryResponse> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {argument: request.name, argumentName: "CATEGORY_NAME"},
      {argument: request.svg, argumentName: "CTAEGORY_SVG"}
    ])

    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    const svgInUrl = ValidUrl.create({value: request.svg})

    if (svgInUrl.isLeft()) {
      return left(svgInUrl.value)
    }

    const categoryResponse = Category.create({name: request.name, svg: svgInUrl.value})
    if (categoryResponse.isLeft()) {
      return left(categoryResponse.value)
    }

    const repoResponse = await this.categoryRepo.save(categoryResponse.value)
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }

    return right(repoResponse.value)
  }
  
}