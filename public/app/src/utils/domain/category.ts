import { ICategoryDTO } from "../dtos/CategoryDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";

export class Category {
  public props: ICategoryDTO;

  constructor(props: ICategoryDTO) {
    this.props = props
  }

  public static create(props: ICategoryDTO) {
    return new Category(props)
  }

  public static async getAll(): Promise<Either<Response, ICategoryDTO[]>> {
    const result = await Api.get('/animals/categories/all')
    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value as ICategoryDTO[])
  }
  
}