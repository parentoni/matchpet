import React, { ElementType, Fragment, useContext, useEffect, useState, useCallback } from "react";
import { PageLayout } from "../../PageLayout";
import { ANIMAL_STATUS, IAnimalDTO, PrintableAnimalStatus } from "../../utils/services/dtos/AnimalDTO";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { BarChart2, CalendarDays, Cat, ChevronDown, Eye, MousePointerClick, Search } from "lucide-react";
import { Filters, FiltersContext } from "../../utils/context/FiltersContext";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO";
import { Categories } from "../../utils/domain/Categories";
import { CategoriesContext } from "../../utils/context/CategoriesContext";
import { Specie } from "../../utils/domain/Specie";
import { AnimalGrid } from "../../elements/partner/new/PartnerAnimalGrid";
import _ from 'lodash';

export function PartnerAnimalManage () {

  const {useSetAnimalGetter, filters, dispatch, countFilters, loading, animalsLoading,animals, useCreateVisualFilter} = useContext(FiltersContext)
  const {user} = useContext(AuthContext)
  
  useSetAnimalGetter(false)

  useEffect(() => {
    const obj: Filters = structuredClone(filters.current)
    if (user) {
      obj['donator_id'] = [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]
      filters.current = structuredClone(obj)
      dispatch(filters.current, [], false)
    }
  }, [user])
  
  const resetFilters = () => {
    const obj: Filters = {}
    if (user) {
      obj['donator_id'] = [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]
      filters.current = structuredClone(obj)
      dispatch(filters.current, [], false)
      
    }
  }

  const [query, setQuery] = useState<string>('')



  const debouncedSearch = _.debounce(() => {
      
    if (query.replace(' ', '').replace('/', '')) {
      const obj: Filters = structuredClone(filters.current)
      obj['name'] = [{comparation_value: `${query}`, mode: FILTER_MODES.REGEX}]
      filters.current = structuredClone(obj)
      dispatch(filters.current, [], false)
    } else {
      const obj: Filters = structuredClone(filters.current)
      delete obj['name']
      filters.current = structuredClone(obj)
      dispatch(filters.current, [], false)
    }
  }, 500);
  useEffect(() => {
    debouncedSearch()
  }, [query])
  
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<boolean>(false)

  return (
    <>

      <div className="w-full h-screen overflow-y-auto relative">
        <header className="w-full sticky bg-white h-12 border-b flex top-0 items-center px-8 gap-2 z-10" >

          

          <search className=" w-[30rem] h-8 border rounded flex items-center relative overflow-hidden" >
            <span className="px-2 absolute ">
              <Search className="w-4 h-4"></Search>
            </span>
            <input value={query} className="w-full h-full pl-8 text-sm bg-neutral-50" placeholder="Pesquisar animal por nome (TODO)" onChange={e => setQuery(e.target.value)}>
            </input>
            <button className="flex gap-2 absolute items-center right-0 top-0 px-2 h-full border-l hover:bg-black hover:bg-opacity-5" onClick={() => setFilterModalIsOpen(true)}>
              <span className="text-sm">Filtrar</span>
              <ChevronDown className=" w-4 h-4"/>
            </button>
          </search>
          {
            (countFilters(['donator_id']) > 0) && <button className="text-sm text-primary underline" onClick={() => {resetFilters();setQuery('')}}>resetar {countFilters(['donator_id'])} filtros</button>
          }
          </header>

          {animalsLoading? <div className="h-[calc(100%-3rem)] w-full bg-white flex items-center justify-center">
            <span className="loading  loading-spinner loading-lg text-primary"></span>
          </div>:
          <>
          <div className="w-full p-8 border-b">
            <h1 className=" font-semibold text-2xl ">Todos animais</h1>
            <p>Veja e adminstre todos animais de sua ong em um único local. Use também os filtros e a barra de pesquisa localizados acima. Dica: Renove os seus animais para eles aparecerem entre um dos primeiros do site.</p>
            <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2 items-center">
              <Eye className="w-4 h-4"/> 
              <span>Visualizações em seus animais: <span className="text-primary">TODO</span></span>
            </div>
            <div className="flex gap-2 items-center">
              <MousePointerClick className="w-4 h-4"/> 
              <span>Cliques em seus animais: <span className="text-primary">TODO</span></span>
            </div>
            
          </div>

          </div>
          <section className="p-8 flex-1 flex flex-col">
            {animals.length > 0?
            <AnimalGrid />: <div className="flex-1 bg-red-100"></div>}
          </section>
          </>
}


      </div>
      <PartnerFilterModal isOpen={filterModalIsOpen} setIsOpen={setFilterModalIsOpen} />
    </>
  )
}


export interface PartnerFilterModalProps {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void
}

export const PartnerFilterModal = (props: PartnerFilterModalProps) => {
  
  const {species} = useContext(SpeciesContext)
  const {useCreateVisualFilter, useCreateVisualCounter, useCountVisual, loading, dispatch} = useContext(FiltersContext)
  const {categories} = useContext(CategoriesContext)
  const {user} = useContext(AuthContext)

  const [selectedSpecie, setSelectedSpecie] = useState<ISpecieDTO | null>(null)
  let [visualFilters, setVisualFilters] = useCreateVisualFilter()
  const [counter, setCounter] = useCreateVisualCounter()

  const closeModal = () => {
    props.setIsOpen(false)
  }

  useEffect(() => {
    if (user) {
      visualFilters['donator_id'] = [{mode: FILTER_MODES.EQUAL, comparation_value: user._id}]
      setVisualFilters(structuredClone(visualFilters))
    }
  }, [user])

  const cleanVisualFilters = (specie_id?:string) => {
    if (user) {
      
      visualFilters = {"donator_id":[{mode: FILTER_MODES.EQUAL, comparation_value: user._id}]}
      if (specie_id) {
        visualFilters['specie_id'] = [{mode: FILTER_MODES.EQUAL, comparation_value: specie_id}]
      }
      setVisualFilters(structuredClone(visualFilters))
    }
  }

  const changeVisualFilters = (key: string, value:string) => {
    visualFilters[key] = [{mode: FILTER_MODES.EQUAL, comparation_value: value}]
    setVisualFilters(structuredClone(visualFilters))
  }
  
  const deleteFromVisualFilters = (key:string) => {
    delete visualFilters[key]
    setVisualFilters(structuredClone(visualFilters))
  }

  const getFromVisualFilters = (key:string) => {
    return visualFilters[key]? visualFilters[key][0].comparation_value : null
  }


  //clean filters
  useCountVisual(visualFilters, setCounter, [])
  

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
       <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25 z-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              >
              <Dialog.Panel className="w-full flex flex-col h-[35rem] max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                  <FilterRadioGroup icon={Cat} setSelected={(x) => {x === null? deleteFromVisualFilters('specie_id'):changeVisualFilters('specie_id', x);cleanVisualFilters(x)}} label="Espécie" options={species.map(a => a._id)} selected={getFromVisualFilters('specie_id')} print={option => species.find(a => a._id === option)?.name || "Qualquer"} />
                  <FilterRadioGroup icon={BarChart2} setSelected={(x) => x === null? deleteFromVisualFilters('status'):changeVisualFilters('status', x)} label="Estado" options={[ANIMAL_STATUS.PENDING, ANIMAL_STATUS.CANCELED, ANIMAL_STATUS.DONATED]} selected={getFromVisualFilters('status')} print={option => PrintableAnimalStatus[option as ANIMAL_STATUS] || "Qualquer"} />
                  {getFromVisualFilters('specie_id') !== null? categories.map((category, cIndex) => {
                    const selectedSpecie = species.find(a => a._id === getFromVisualFilters('specie_id'))
                    if (selectedSpecie) {
                      const domainSpecie = Specie.create(selectedSpecie)
                      return domainSpecie.getTraitsThatMatchCategory(category._id).map((trait, tIndex) => {
                        return <FilterRadioGroup key={cIndex * 10 + tIndex} icon={Cat} setSelected={(x) => x === null? deleteFromVisualFilters(`trait_${trait._id}`):changeVisualFilters(`trait_${trait._id}`, x)} label={trait.name} options={trait.options.map(a => a._id)} selected={getFromVisualFilters(`trait_${trait._id}`)} print={option => trait.options.find(a => a._id === option)?.name || 'Qualquer'}/>
                    })
                    }

                    return null
                  }):""}
                </div>
                <div className="p-4 border-t flex gap-4 items-center justify-end">
                  <button className="flex items-center justify-center bg-neutral-50 border-neutral-200 border h-8 px-2 rounded text-sm hover:bg-black hover:bg-opacity-5" onClick={() => cleanVisualFilters()}>
                    Limpar
                  </button>
                  <button className="flex items-center justify-center h-8 px-2 rounded text-sm bg-primary text-white hover:bg-primary hover:bg-opacity-80 hover:border border-primary  border" onClick={() => {dispatch(visualFilters, [], false); closeModal()}}>
                    Mostrar {loading?<span className="loading loading-spinner loading-sm"></span> : counter} resultados
                  </button>
                </div>
              </Dialog.Panel>

            </Transition.Child>    
          </div>
        </div>
      </Dialog>
       
    </Transition>
  )
}

export interface FilterRadioGroupProps<T> {
  label: string,
  selected: T,
  options: T[],
  print: (option:T) => string,
  setSelected: (x:T) => void,
  icon: React.ElementType
}

export function FilterRadioGroup <T>(props: FilterRadioGroupProps<T | null>) {

  return (
  <RadioGroup value={props.selected} onChange={props.setSelected}>
    <div className="flex gap-2 items-center">
      <props.icon className={'w-4 h-4'}/>
      <RadioGroup.Label className={"text-sm"}>{props.label}</RadioGroup.Label>
    </div>
    <div className=" flex gap-4 pt-2 w-full overflow-x-auto">
      <RadioGroup.Option value={null} className={({checked}) => checked?"flex items-center text-primary justify-center h-8 px-2 rounded text-sm bg-primary  bg-opacity-10  border-primary border border-opacity-10":"flex items-center justify-center bg-neutral-50 border-neutral-200 border h-8 px-2 rounded text-sm cursor-pointer hover:bg-black hover:bg-opacity-5"}>
        {props.print(null)}
      </RadioGroup.Option>
      {props.options.map((option, index) => 
        <RadioGroup.Option key={index} value={option} className={({checked}) => checked?"flex  items-center text-primary justify-center h-8 px-2 rounded text-sm bg-primary  bg-opacity-10  border-primary border border-opacity-10":"flex items-center justify-center bg-neutral-50 border-neutral-200 cursor-pointer border h-8 px-2 rounded text-sm hover:bg-black hover:bg-opacity-5"}>
          {props.print(option)}
        </RadioGroup.Option>
      )}
    </div>
  </RadioGroup>)
}

export function CreateCategorySVG (link:string): ElementType {
  return (
    <img alt="Ícone" src={link}></img> as unknown as ElementType
  )
}

