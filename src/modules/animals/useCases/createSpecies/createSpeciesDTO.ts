import { SpecieTraitProps } from "../../domain/specie/SpecieTrait";

export interface CreateSpeciesDto {
  SpecieName: string;
  SpecieTraits: {
    name: string;
    svg: string;
    options: string[];
    optional: boolean;
    category: string;
    print: string;
  }[];
}
