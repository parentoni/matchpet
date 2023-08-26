import { SpecieTraitProps } from "../../domain/animal/SpecieTraits";

export interface CreateSpeciesDto {
    SpecieName: string,
    SpecieTraits: {
        name: string,
        svg: string,
        options: string[],
        optional:boolean,
        category: string
    }[]
}
