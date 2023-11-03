import { useContext, useEffect, useState } from "react"
import './PartnerAnimalsGrid.css'
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { PartnerSpecificAnimalCard } from "./PartnerSpecificAnimalCard"
import { FiltersContext } from "../../utils/context/FiltersContext"

export interface PartnerAnimalsGridProps {
  animals: IAnimalDTO[],
  animalsCount: number
}
export const PartnerAnimalGrid =  (props: PartnerAnimalsGridProps) => {

  const {page, setPage, setFilters} = useContext(FiltersContext)

  useEffect(() => {
    setPage(0)
    setFilters({})
  }, [])
  return(
        <>
          <div className="w-full grid grid-resizable-columns gap-10 mt-10">
            {props.animals.map(a => <PartnerSpecificAnimalCard animal={a}/>)}
          </div>

            {(props.animals.length < props.animalsCount)?
            <button className="w-full mt-10 h-12 flex items-center bg-black justify-center text-white" onClick={() => setPage(page+1)}>
              Carregar mais
            </button>:''}
        </>
)}

