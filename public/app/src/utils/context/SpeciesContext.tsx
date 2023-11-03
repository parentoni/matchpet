import React, { createContext, useEffect, useState } from "react";
import { ISpecieDTO } from "../services/dtos/SpecieDTO";
import { Specie } from "../domain/Specie";

export const SpeciesContext = createContext<{species: ISpecieDTO[]}>({species:[]})

export function SpeciesContextProvider({children}: React.PropsWithChildren<{}>) {

  const [species, setSpecies] = useState<ISpecieDTO[]>([])

  useEffect(() => {
    Specie.getAll().then((response) => {
      if (response.isLeft()) {
        alert("Erro carregando animais")
      } else {
        setSpecies([...(response.value as ISpecieDTO[])])
        
      }
    })
  }, [])

  return(
    <SpeciesContext.Provider value={{species: species}}>
      {children}
    </SpeciesContext.Provider>
  )
}