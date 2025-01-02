export type IbgeState = {
  id:string //note: IBGE marks this field as a number
  nome: string,
  sigla: string,
  regiao: {
    id: string,
    nome:string,
    sigla:string,
  }
}

export type IbgeMesoregion = {
  id:string // note: same as IbgeState's id
  nome: string,
  UF: IbgeState,
}
