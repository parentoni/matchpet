import { ISpecieDTO, ISpecieTraitDTO } from "../services/dtos/SpecieDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";
import { IAnimalTraitsDTO } from "../services/dtos/AnimalDTO";

export class Specie {
  public props: ISpecieDTO;

  constructor(props: ISpecieDTO) {
    this.props = props;
  }

  public static create(props: ISpecieDTO) {
    return new Specie(props);
  }

  public static async getAll(): Promise<Either<Response, ISpecieDTO[]>> {
    const response = await Api.get("/animals/species/all");
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(response.value as ISpecieDTO[]);
  }

  public getTraitsThatMatchCategory(categoryID: string): ISpecieTraitDTO[] {
    const traits: ISpecieTraitDTO[] = [];
    for (const trait of this.props.traits) {
      if (trait.category === categoryID) {
        traits.push(trait);
      }
    }

    return traits;
  }

  public getTraitByVariable(variable: keyof ISpecieTraitDTO, value: string): ISpecieTraitDTO | undefined {
    const result = this.props.traits.find((el) => el[variable] === value);
    if (result) {
      return result;
    }

    return undefined;
  }

  public getTraitOptionValueById(traitId: string, optionId: string) {
    const trait = this.props.traits.find((el) => el._id === traitId);
    if (trait) {
      const option = trait.options.find((el) => el._id === optionId);
      if (option) {
        return option;
      }
    }
    return undefined;
  }

  get obrigatoryTraits() {
    const traitsList: ISpecieTraitDTO[] = [];

    if (this.props) {
      for (const trait of this.props.traits) {
        if (!trait.optional) {
          traitsList.push(trait);
        }
      }
    }

    return traitsList;
  }

  get optionalTraits() {
    const traitsList: ISpecieTraitDTO[] = [];

    if (this.props) {
      for (const trait of this.props.traits) {
        if (trait.optional) {
          traitsList.push(trait);
        }
      }
    }

    return traitsList;
  }
}
