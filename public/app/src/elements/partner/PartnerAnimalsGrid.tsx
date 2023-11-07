import { useContext, useEffect, useState } from "react"
import './PartnerAnimalsGrid.css'
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { PartnerSpecificAnimalCard, PartnerSpecificAnimalCardSkeleton } from "./PartnerSpecificAnimalCard"
import { FiltersContext } from "../../utils/context/FiltersContext"
import { UserAnimalCardSkeleton } from "../Animals/AnimalsGrid"

export interface PartnerAnimalsGridProps {
  animals: IAnimalDTO[],
  animalsCount: number,
  loading:boolean
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
            {props.loading && [...Array(50).keys()].map(_ => <PartnerSpecificAnimalCardSkeleton />)}
          </div>

            {(props.animals.length < props.animalsCount)?
            <button className="w-full mt-10 h-12 flex items-center bg-black justify-center text-white" onClick={() => setPage(page+1)}>
              Carregar mais
            </button>:''}
        </>
)}

