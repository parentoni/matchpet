import React, { createContext, useEffect, useState } from "react";
import { ISpecieDTO } from "../services/dtos/SpecieDTO";
import { Specie } from "../domain/Specie";

export const SpeciesContext = createContext<{species: ISpecieDTO[], preferredSpecie:string | undefined, setPreferredSpecie: (x:string) => void}>({species:[], preferredSpecie:undefined, setPreferredSpecie: () => {}})

export function SpeciesContextProvider({children}: React.PropsWithChildren<{}>) {

  const [species, setSpecies] = useState<ISpecieDTO[]>([])
  const [preferredSpecie, setPreferredSpecie] = useState<string>()

  useEffect(() => {
    Specie.getAll().then((response) => {
      if (response.isLeft()) {
        alert("Erro carregando animais")
      } else {
        setSpecies([...(response.value as ISpecieDTO[])])
        
      }
    })
  }, [])


  useEffect(() => {
    const specie = localStorage.getItem('prefered_specie')
    if (specie && specie !== null) {
      setPreferredSpecie(specie)
    } else {
      setPreferredSpecie("NULL")
    }
  }, [])
  useEffect(() => {
    if (preferredSpecie) {
      localStorage.setItem('prefered_specie', preferredSpecie )
    }
  }, [preferredSpecie])

  return(
    <SpeciesContext.Provider value={{species: species, preferredSpecie:preferredSpecie, setPreferredSpecie}}>
      {children}
    </SpeciesContext.Provider>
  )
}