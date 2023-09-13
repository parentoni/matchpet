import { ICategoryDTO } from "../dtos/CategoryDTO";
import { Category } from "./category";

export class Categories {
  public list: Category[];

  constructor (list: Category[]) {
    this.list = list
  }

  public static createFromDTO (arrayDTO: ICategoryDTO[]): Categories {
    const categoryArray: Category[] = []
    for (const categoryDTO of arrayDTO) {
      categoryArray.push(Category.create(categoryDTO))
    }

    return new Categories(categoryArray)
  }

  public findByID (id:string) {
    return this.list.find(el => el.props._id === id)
  }
}