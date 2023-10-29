import { FILTER_MODES } from "../../elements/Animals/filters";
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

  public static async getAll(page: number, filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>, coordinates?: [number,number][]): Promise<Either<Response, {animals:IAnimalDTO[], count:number}>> {
    
    const formatedFilters = []
    for (const key of Object.keys(filters)) {
      for (const method of filters[key]) {
        if (!key.includes('trait')) {
          formatedFilters.push({'mode':method.mode, "comparation_value":method.comparation_value, key: key})
        } else {
          formatedFilters.push({'mode':method.mode, "comparation_value":method.comparation_value, key: 'traits.value'})

        }
      }
    }

    const response = await Api.post('/animals/filter', JSON.stringify(coordinates?coordinates.length>0?{page: page, filter: formatedFilters, coordinates:[coordinates]}:{page: page, filter: formatedFilters}:{page: page, filter: formatedFilters} ))
    if (response.isLeft()) {
      return left(response.value)
    }

    return right({animals: response.value['animals'] as IAnimalDTO[], count: response.value["count"] as number})

  }
  
  public getTraitById(id:string) {
    const response = this.props.traits.find(el => el._id === id)
    if (response) {
      return response
    }
  }

}