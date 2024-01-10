import { useContext, useEffect, useState } from "react"
import {Filters, FiltersContext } from "../utils/context/FiltersContext"
import { AnimalFilters, FILTER_MODES } from "./Animals/filters"
import { FullPageModal } from "./FullPageModal"
import { SpeciesContext } from "../utils/context/SpeciesContext"
import { ISpecieDTO } from "../utils/services/dtos/SpecieDTO"
import { LocationFilter } from "./Animals/filters/LocationFilter"
import { Categories } from "../utils/domain/Categories"
import { CategoriesContext } from "../utils/context/CategoriesContext"
import { Specie } from "../utils/domain/Specie"
import { ANIMAL_STATUS } from "../utils/services/dtos/AnimalDTO"
import { AuthContext } from "../utils/context/AuthContext"
import { SEX } from "../utils/domain/Animal"

export interface FilterModalProps {
  animalsCount: number,
  loading: boolean,
  open: boolean,
  setIsOpen: (x: boolean) => void,
  searchArea: [number, number][],
  setSearchArea: (x: [number, number][]) => void,
  isPartner: boolean,
}

export const FilterModal = (props: FilterModalProps) => {

  const {species, preferredSpecie} = useContext(SpeciesContext)
  const {categories} = useContext(CategoriesContext)
  const {useCreateVisualFilter, useCreateVisualCounter, useCreateVisualCoordinates, useCountVisual, dispatch, filters} = useContext(FiltersContext)
  const {user} = useContext(AuthContext)

  const [selectedSpecie, setSelectedSpecie] = useState<ISpecieDTO | null>(null)

  const [filtersV, setFilters] = useCreateVisualFilter()
  const [coordinatesV, setCoordinatesV] = useCreateVisualCoordinates()
  const [counter, setCounter] = useCreateVisualCounter()

  useCountVisual(filtersV, setCounter, coordinatesV)

  const createBaseFilters = (specie: string | null) => {
    const obj: Filters = {}
    if (props.isPartner && user) {
      obj['donator_id'] = [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]
    } else {
      obj['status'] = [{comparation_value: ANIMAL_STATUS.PENDING, mode: FILTER_MODES.EQUAL}]
      if (specie !== null) {
        obj['specie_id'] = [{comparation_value: specie, mode: FILTER_MODES.EQUAL}]
      }
    }
    return obj
  }

  console.log(filtersV)
  useEffect(() => {
    setFilters(createBaseFilters(selectedSpecie? selectedSpecie._id: null))
  }, [selectedSpecie, props.isPartner])

  useEffect(() => {
    if (preferredSpecie && species) {
      if (preferredSpecie !== 'NULL') {
        const specie = species.find(x => x._id === preferredSpecie)
        if (specie) {
          setSelectedSpecie(specie)
        }
      } 

    }
  }, [preferredSpecie, species])

  useEffect(() => {
    const obj: Filters = {}
    if (props.isPartner && user) {
      obj['donator_id'] = [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]
    } else {
      obj['status'] = [{comparation_value: ANIMAL_STATUS.PENDING, mode: FILTER_MODES.EQUAL}]
      if (localStorage.getItem('prefered_specie') !== null) {
        obj['specie_id'] = [{comparation_value: localStorage.getItem('prefered_specie'), mode: FILTER_MODES.EQUAL}]
      }
    }

    filters.current = structuredClone(obj)
  }, [])

  return (
    <>

      <FullPageModal isOpen={props.open} setIsOpen={props.setIsOpen} absolute={false} title='FILTRAR' className='w-full'>
        {categories && species && 
          <>
            <div className="border-b flex gap-8 px-8 overflow-x-scroll no-scrollbar  pt-5 z-50">
              <div className="font-medium flex flex-col h-full">
                <button onClick={() => setSelectedSpecie(null)} className=" whitespace-nowrap">TODOS</button>
                <div className={`h-4 w-full ${!selectedSpecie? 'bg-black':''}`}></div>
              </div>
              {species && species.map(s => 
                <div className="font-medium flex flex-col" key={s.name} >
                  <button onClick={() => setSelectedSpecie(s)} className=" whitespace-nowrap">{s.name}</button>
                  <div className={`h-2 w-full ${selectedSpecie === s? 'bg-black':''}`}></div>
                </div>)}
            </div>
            <div className='flex-col flex items-center w-full h-full overflow-y-scroll '>
              <div className='grid lg:grid-cols-2 grid-cols-1 w-full max-w-2xl'>


                <div className="px-8 py-8">
                  <div className='block lg:hidden'>
                    <LocationFilter searchArea={coordinatesV} setSearchArea={setCoordinatesV} filters={filtersV} setFilters={setFilters}/>
                  </div>
                  {/* <SlideFilter filters={sketchFilters} setFilters={setSketchFilters} max={max} min={min} setMax={setMax} setMin={setMin}/> */}
                  <AnimalFilters.ChoiceFilter 
                    filters={filtersV}
                    setFilters={setFilters}
                    trait_name={"sex"}
                    title="Sexo"
                    options={[{_id: SEX.MALE, name: "Macho"}, {_id: SEX.FEMALE, name: "Fêmea"}]}
                  />
                  {props.isPartner?<StatusFilter/>:''}
                  {selectedSpecie && Categories.createFromDTO(categories).list.map((category, index) => {
                    return(
                      <div key={index}>
                        <div className='border-b flex flex-col gap-3 py-5'>
                          <h2 className='font-semibold'>{category.props.name}</h2>
                          {Specie.create(selectedSpecie).getTraitsThatMatchCategory(category.props._id).map((trait, index) => (
                            <div key={index}>
                              <AnimalFilters.ChoiceFilter filters={filtersV} setFilters={setFilters} title={trait.name} trait_name={`trait_${trait._id}`} options={trait.options}/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  )}
                </div>

                <div className='px-8 hidden lg:block'>
                  <LocationFilter searchArea={coordinatesV} setSearchArea={setCoordinatesV} filters={filtersV} setFilters={setFilters}/>
                </div>



              </div>


            </div>
            <div className="bottom-8 inset-0 px-8 w-full flex justify-between col-span-1 z-50 lg:col-span-2 py-5 border-t">
              <button className='h-12  gap-6 px-6 text-white bg-black brute-border rounded items-center flex' onClick={() => setFilters({})}>
                Limpar
              </button>
              <button className='h-12  px-6 bg-primary rounded  items-center flex' onClick={() => {dispatch(filtersV, coordinatesV, true);props.setIsOpen(false)}}>
                Mostar &nbsp;{props.loading?<span className='loading loading-spinner loading-xs'></span>:counter}&nbsp; animais
              </button>
            </div>
          </>
        }

      </FullPageModal>

    </>
  )
}


export const StatusFilter = () => {

  // const { sketchFilters, setSketchFilters} = useContext(FiltersContext)

  const clearFilter = () => {
    // delete sketchFilters['status']
    // setSketchFilters(structuredClone(sketchFilters))
  }

  const changeFilters = (option:string) => {
    // sketchFilters['status'] = [{mode: FILTER_MODES.EQUAL, comparation_value: option}]
    // setSketchFilters(structuredClone(sketchFilters))
  }


  let sketchFilters = {}
  const setSketchFilters = () => {}

  return (
    <div className="flex flex-col gap-2 mt-5">
      <h2 className="font-semibold">Estado</h2>
      {/* <div className="flex gap-3 overflow-x-scroll overflow-y-hidden no-scrollbar">
        <button className={`px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${sketchFilters['status']?"":"bg-black text-white"}`} onClick={() => clearFilter()}>
          Tanto faz
        </button>
        {[ANIMAL_STATUS.CANCELED, ANIMAL_STATUS.PENDING, ANIMAL_STATUS.DONATED].map(s => 
          <button className={`px-4 py-1  text-xs  brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${sketchFilters['status']?s === sketchFilters['status'][0].comparation_value?"bg-black text-white":"":''}`} onClick={() => changeFilters(s)}>
            {s === ANIMAL_STATUS.CANCELED? "Excluído": s === ANIMAL_STATUS.PENDING? "Em adoção": "Doado"}
          </button>
          )}
      </div> */}
    </div>
  )
}
