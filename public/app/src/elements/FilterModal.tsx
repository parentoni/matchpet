import { useContext, useEffect, useState } from "react"
import { ContextProps } from "../utils/context/FiltersContext"
import { AnimalFilters, FILTER_MODES } from "./Animals/filters"
import { FullPageModal } from "./FullPageModal"
import { SpeciesContext } from "../utils/context/SpeciesContext"
import { ISpecieDTO } from "../utils/services/dtos/SpecieDTO"
import { LocationFilter } from "./Animals/filters/LocationFilter"
import { SlideFilter } from "./Animals/filters/SlideFilter"
import { Categories } from "../utils/domain/Categories"
import { CategoriesContext } from "../utils/context/CategoriesContext"
import { Specie } from "../utils/domain/Specie"
import { ANIMAL_STATUS } from "../utils/services/dtos/AnimalDTO"

export interface FilterModalProps {
  setFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  animalsCount: number,
  loading: boolean,
  open: boolean,
  setIsOpen: (x: boolean) => void,
  searchArea: [number, number][],
  setSearchArea: (x: [number, number][]) => void,
  isPartner: boolean

}

export const FilterModal = (props: FilterModalProps) => {

  const {species} = useContext(SpeciesContext)
  const {categories} = useContext(CategoriesContext)

  const [selectedSpecie, setSelectedSpecie] = useState<ISpecieDTO | undefined>()


  useEffect(() => {
    if (selectedSpecie) {
      props.setFilters({'specie_id': [{mode: FILTER_MODES.EQUAL, comparation_value: selectedSpecie?._id}]})
    } else {
      props.setFilters({})
    }
    
  }, [selectedSpecie])

  console.log(categories)
  return (
    <>
      
    <FullPageModal isOpen={props.open} setIsOpen={props.setIsOpen} absolute={false} title='FILTRAR' className='w-full'>
    {categories && species && 
      <div className='flex-col flex items-center w-full '>
        <div className='grid lg:grid-cols-2 grid-cols-1 w-full'>
          <div className="border-b flex gap-8 px-8 overflow-x-scroll no-scrollbar">
              <div className="font-medium">
                <button onClick={() => setSelectedSpecie(undefined)} className=" whitespace-nowrap">TODOS</button>
                <div className={`h-2 w-full ${!selectedSpecie? 'bg-black':''}`}></div>
            </div>
            {species && species.map(s => 
              <div className="font-medium">
                <button onClick={() => setSelectedSpecie(s)} className=" whitespace-nowrap">{s.name}</button>
                <div className={`h-2 w-full ${selectedSpecie === s? 'bg-black':''}`}></div>
              </div>)}
          </div>

          <div className="px-8">
            <div className='block lg:hidden'>
              <LocationFilter searchArea={props.searchArea} setSearchArea={props.setSearchArea} filters={props.filters} setFilters={props.setFilters}/>
            </div>
            <SlideFilter filters={props.filters} setFilters={props.setFilters}/>
            <StatusFilter filters={props.filters} setFilters={props.setFilters}/>
            {selectedSpecie && Categories.createFromDTO(categories).list.map(category => {
              console.log(selectedSpecie, 'oi')
            return(
              <div className='border-b flex flex-col gap-3 py-5'>
                <h2 className='font-semibold'>{category.props.name}</h2>
                {Specie.create(selectedSpecie).getTraitsThatMatchCategory(category.props._id).map((trait, index) => (
                  <AnimalFilters.ChoiceFilter filters={props.filters} setFilters={props.setFilters} title={trait.name} trait_name={`trait_${trait._id}`} options={trait.options}/>
                ))}
              </div>
            )}
            )}
          </div>

          <div className='px-8 hidden lg:block'>
            <LocationFilter searchArea={props.searchArea} setSearchArea={props.setSearchArea} filters={props.filters} setFilters={props.setFilters}/>
          </div>

          <div className='pb-20 '></div> 
            <div className="sticky bottom-8 inset-0 px-8 w-full h-12 flex justify-between col-span-1 lg:col-span-2">
              <button className='h-full px-6 bg-black text-white items-center flex' onClick={() => props.setFilters({})}>
                Limpar
              </button>
              <button className='h-full px-6 bg-primary  items-center flex' onClick={() => props.setIsOpen(false)}>
                Mostar &nbsp;{props.loading?<span className='loading loading-spinner loading-xs'></span>:props.animalsCount}&nbsp; animais
              </button>
            </div>
        </div>
      </div>
}
    </FullPageModal>

    </>
  )
}

export interface StatusFilterProps {
  setFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
}
export const StatusFilter = (props: StatusFilterProps) => {

  const clearFilter = () => {
    delete props.filters['status']
    props.setFilters(structuredClone(props.filters))
  }

  const changeFilters = (option:string) => {
    props.filters['status'] = [{mode: FILTER_MODES.EQUAL, comparation_value: option}]
    props.setFilters(structuredClone(props.filters))
  }

  return (
    <div className="flex flex-col gap-2 mt-5">
      <h2 className="font-semibold">Estado</h2>
      <div className="flex gap-3 overflow-x-scroll overflow-y-hidden no-scrollbar">
        <button className={`px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${props.filters['status']?"":"bg-black text-white"}`} onClick={() => clearFilter()}>
          Tanto faz
        </button>
        {[ANIMAL_STATUS.CANCELED, ANIMAL_STATUS.PENDING, ANIMAL_STATUS.DONATED].map(s => 
          <button className={`px-4 py-1  text-xs  brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${props.filters['status']?s === props.filters['status'][0].comparation_value?"bg-black text-white":"":''}`} onClick={() => changeFilters(s)}>
            {s === ANIMAL_STATUS.CANCELED? "Excluído": s === ANIMAL_STATUS.PENDING? "Em adoção": "Doado"}
          </button>
          )}
      </div>
    </div>
  )
}