import React, { ElementType, useContext, useEffect, useState, useCallback } from "react";
import { PageLayout } from "../../PageLayout";
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { CalendarDays, ChevronDown, Eye, Menu, MousePointerClick, Search } from "lucide-react";
import { Filters, FiltersContext } from "../../utils/context/FiltersContext";
import { RadioGroup } from "@headlessui/react";
import { Categories } from "../../utils/domain/Categories";
import { AnimalGrid } from "../../elements/partner/new/PartnerAnimalGrid";
import _ from 'lodash';
import { User } from "../../utils/domain/User";
import { PartnerFilterModal } from "./PartnerFilterModal";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../elements/partner/new/PartnerBase";

export function PartnerAnimalManage () {

  const {useSetAnimalGetter, filters, dispatch, countFilters, animalsLoading, animals, persistentCounter} = useContext(FiltersContext)
  const {user, getToken} = useContext(AuthContext)
  
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


  const [stats, setStats] = useState<{clicks:number, views:number} | undefined>(undefined)
  useEffect(() => {
    User.getUserAnimalStats(getToken()).then(res => {
      console.log(res)
      if (res.isLeft()) {
        return alert(res.value)
      }

      console.log(res.value)
      setStats(res.value)
    })
  }, [])

  const {isOpen, setIsOpen} = useOutletContext() as OutletContextType
  console.log(animals, animals.length)
  return (
    <>
      <div className="w-full flex flex-col h-screen overflow-y-auto relative">
        <header className="w-full sticky bg-white h-12 border-b flex items-center top-0 px-8  z-10" >
          <div className="gap-2 h-12 items-center hidden md:flex ">
            <search className=" w-[30rem] h-8 border rounded items-center relative overflow-hidden flex">
              <span className="px-2 absolute ">
                <Search className="w-4 h-4"></Search>
              </span>
              <input value={query} className="w-full h-full pl-8 text-sm bg-neutral-50" placeholder="Pesquisar animal por nome" onChange={e => setQuery(e.target.value)}>
              </input>
              <button className="flex gap-2 absolute items-center right-0 top-0 px-2 h-full border-l hover:bg-black hover:bg-opacity-5" onClick={() => setFilterModalIsOpen(true)}>
                <span className="text-sm">Filtrar</span>
                <ChevronDown className=" w-4 h-4"/>
              </button>
            </search>
            {
              (countFilters(['donator_id']) > 0) && <button className="text-sm text-primary underline" onClick={() => {resetFilters();setQuery('')}}>resetar {countFilters(['donator_id'])} filtros</button>
            }
          </div>

          <button onClick={() => setIsOpen(true)} className="flex md:hidden h-12 gap-4 items-center ">
            <Menu />
            <h1 className=" font-medium text-xl">Todos animais</h1>
          </button>
        </header>

          {animalsLoading &&
            <div className="h-[calc(100%-3rem)] absolute z-10 top-[3rem] left-0 w-full">
              <div className="w-full h-full fixed bg-white flex items-center justify-center">
              <span className="loading  loading-spinner loading-lg text-primary"></span>
              </div>
            </div> }
            <div className=" flex flex-col flex-1">
              <div className="w-full p-8 border-b">
                <h1 className=" font-semibold text-2xl hidden md:block">Todos animais</h1>
                <p>Veja e adminstre todos animais de sua ong em um único local. Use também os filtros e a barra de pesquisa. Dica: Renove os seus animais para eles aparecerem entre um dos primeiros do site.</p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex gap-2 items-center">
                    <Eye className="w-4 h-4"/> 
                    <span>Visualizações em seus animais: <span className="text-primary">{stats?.views}</span></span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MousePointerClick className="w-4 h-4"/> 
                    <span>Cliques em seus animais: <span className="text-primary">{stats?.clicks}</span></span>
                  </div>
                </div>
              </div>
          
              <section className="p-8 flex-1 flex flex-col">
                <div className="h-20 block md:hidden">
                  <div className="w-full h-12 flex items-center bg-white ">
                    <search className=" w-full h-8 border rounded items-center relative overflow-hidden flex">
                  <span className="px-2 absolute ">
                    <Search className="w-4 h-4"></Search>
                  </span>
                  <input value={query} className="w-full h-full pl-8 text-sm bg-neutral-50" placeholder="Pesquisar animal por nome" onChange={e => setQuery(e.target.value)}>
                  </input>
                  <button className="flex gap-2 absolute items-center right-0 top-0 px-2 h-full border-l hover:bg-black hover:bg-opacity-5" onClick={() => setFilterModalIsOpen(true)}>
                    <span className="text-sm">Filtrar</span>
                    <ChevronDown className=" w-4 h-4"/>
                  </button>
                    </search>
                  </div>
                  {
                    (countFilters(['donator_id']) > 0) && <button className="text-sm text-primary underline" onClick={() => {resetFilters();setQuery('')}}>resetar {countFilters(['donator_id'])} filtros</button>
                  }
                </div>

            {animals.length > 0?
            <>
              <AnimalGrid />
              
            </>
            : <div className="flex-1 flex flex-col justify-center items-center">
              <h1 className="font-medium text-2xl text-primary">Nenhum animal encontrado</h1>
              <p className="text-sm">Tente mudar os filtros ou pesquisar por outro nome</p>
            </div>}
          </section>
          </div>



      </div>
      <PartnerFilterModal isOpen={filterModalIsOpen} setIsOpen={setFilterModalIsOpen} />
    </>
  )
}
