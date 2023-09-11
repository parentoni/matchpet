import { ISpecieDTO } from "../dtos/SpecieDTO";

export class Specie {
  public props: ISpecieDTO;

  constructor(props: ISpecieDTO) {
    this.props = props
  }

  public static create(props: ISpecieDTO) {
    return new Specie(props)
  }
}