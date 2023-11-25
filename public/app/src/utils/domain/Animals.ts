import { IAnimalDTO } from "../services/dtos/AnimalDTO";
import { Animal } from "./Animal";

export class Categories {
  public list: Animal[];

  constructor(list: Animal[]) {
    this.list = list;
  }

  public static createFromDTO(arrayDTO: IAnimalDTO[]): Categories {
    const AnimalArray: Animal[] = [];
    for (const AnimalDTO of arrayDTO) {
      AnimalArray.push(Animal.create(AnimalDTO));
    }

    return new Categories(AnimalArray);
  }

  public findByID(id: string) {
    return this.list.find((el) => el.props._id === id);
  }
}
