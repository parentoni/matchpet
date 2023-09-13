import { ISpecieDTO } from "../dtos/SpecieDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";

export class Specie {
  public props: ISpecieDTO;

  constructor(props: ISpecieDTO) {
    this.props = props
  }

  public static create(props: ISpecieDTO) {
    return new Specie(props)
  }

  public static async  getAll(): Promise<Either<Response, ISpecieDTO[]>> {
    const response = await Api.get('/animals/species/all')
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as ISpecieDTO[])
  }
}