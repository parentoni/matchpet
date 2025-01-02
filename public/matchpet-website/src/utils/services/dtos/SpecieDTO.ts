export interface ISpecieDTO {
  _id: string;
  name: string;
  traits: ISpecieTraitDTO[];
}

export interface ISpecieTraitDTO {
  _id: string;
  name: string;
  svg: string;
  optional: boolean;
  category: string;
  options: ISpecieTraitOptionsDTO[];
  print: string;
}

export interface ISpecieTraitOptionsDTO {
  _id: string;
  name: string;
}
