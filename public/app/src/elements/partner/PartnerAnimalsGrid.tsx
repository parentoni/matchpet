import './PartnerAnimalsGrid.css'
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { PartnerSpecificAnimalCard, PartnerSpecificAnimalCardSkeleton } from "./PartnerSpecificAnimalCard"
import { FILTER_MODES } from "../Animals/filters"

export interface PartnerAnimalsGridProps {
  animals: IAnimalDTO[],
  animalsCount: number,
  loading:boolean,
  page: number
  setPage: (s: number) => void,
  setFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void
}


export const PartnerAnimalGrid =  (props: PartnerAnimalsGridProps) => {


  return(
        <>
          <div className="w-full grid grid-resizable-columns gap-10 mt-10">
            {props.animals.map(a => <PartnerSpecificAnimalCard animal={a}/>)}
            {props.loading && [...Array(50).keys()].map(_ => <PartnerSpecificAnimalCardSkeleton />)}
          </div>

            {(props.animals.length < props.animalsCount)?
            <button className="w-full mt-10 h-12 flex items-center bg-black justify-center text-white" onClick={() => props.setPage(props.page+1)}>
              Carregar mais
            </button>:''}
        </>
)}

