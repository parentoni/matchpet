import { IAnimalDTO } from "../dtos/AnimalDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";

export class Animal {
  public props: IAnimalDTO;

  constructor(props: IAnimalDTO) {
    this.props = props
  }

  public static create(props: IAnimalDTO) {
    return new Animal(props)
  }

  public static async getSpecific(animalId:string): Promise<Either<Response, Animal>> {
    const response = await Api.get(`/animals/${animalId}`)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(this.create(response.value))
  }
  
  public getTraitById(id:string) {
    const response = this.props.traits.find(el => el._id === id)
    if (response) {
      return response
    }
  }
}