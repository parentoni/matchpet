import React, { createContext, useEffect, useState } from "react"
import { FILTER_MODES } from "../../elements/Animals/filters"
import { IAnimalDTO } from "../dtos/AnimalDTO"
import { Animal } from "../domain/Animal"

export interface ContextProps {
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  animalsCount:number,
  animals:IAnimalDTO[],
  setAnimals: (x: IAnimalDTO[]) => void,
  page: number,
  setPage: (x: number) => void,
  searchArea: [number, number][],
  setSearchArea: (x: [number, number][]) => void

}

export const FiltersContext = createContext<ContextProps>({filters:{} ,setFilters: () => {}, animalsCount:0, animals: [], page: 0, setPage :() => {}, setAnimals: () => {}, searchArea: [], setSearchArea: () => {}})

export const FiltersContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  const [filters, setFilters] = useState<Record<string, {mode: FILTER_MODES, comparation_value:any}[]>>({})
  const [searchArea, setSearchArea] = useState<[number, number][]>([])

  const [page, setPage] = useState<number>(0)

  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])

  useEffect(() => {
    Animal.getAll(page, filters, searchArea).then((response) => {
      if (response.isLeft()) {
        alert("Erro lendo animais.")
      } else {
        if (page !== 0) {
          setAnimals(animals => [...animals, ...response.value.animals])
        }  else {
          setAnimals(response.value.animals)
        }
        setAnimalsCount(response.value.count)
      }

    })
  }, [page, filters, searchArea])

  useEffect(() => {
    setPage(0)
  }, [filters, searchArea])
  
  return (
    <FiltersContext.Provider value={{filters, setFilters, animalsCount: animalsCount || 0, animals, page, setPage ,setAnimals, searchArea, setSearchArea}}>
      {children}
    </FiltersContext.Provider>
  )
}