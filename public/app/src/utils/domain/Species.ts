import { ISpecieDTO } from "../services/dtos/SpecieDTO";
import { Specie } from "./Specie";

export class Species {
  public list: Specie[];

  constructor (list: Specie[]) {
    this.list = list
  }

  public static createFromDTO (arrayDTO: ISpecieDTO[]): Species {
    const specieArray: Specie[] = []
    for (const specieDTO of arrayDTO) {
      specieArray.push(Specie.create(specieDTO))
    }

    return new Species(specieArray)
  }

  public findByID (id:string) {
    return this.list.find(el => el.props._id === id)
  }
}