import { useContext, useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { Animal } from "../../utils/domain/Animal";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FilterModal } from "../../elements/FilterModal";
import { OutletContextType } from "../../elements/ManagerBase";
import { CalendarDays, ChevronDown, Eye, MousePointerClick, Search } from "lucide-react";
import { AnimalGrid } from "../../elements/partner/new/PartnerAnimalGrid";
import { Filters, FiltersContext } from "../../utils/context/FiltersContext";
export function PartnerAnimalManage () {

  const {useSetAnimalGetter, filters, dispatch, } = useContext(FiltersContext)
  const {user} = useContext(AuthContext)
  
  useSetAnimalGetter()

  useEffect(() => {
    const obj: Filters = {}
    if (user) {
      obj['donator_id'] = [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]
      filters.current = structuredClone(obj)
      dispatch(filters.current, [])
    }
  }, [user])
  

  const {setIsOpen, isOpen} = useOutletContext<OutletContextType>()
  return (
    <div className="w-full h-screen overflow-y-scroll">
       <header className="w-full sticky bg-white h-12 border-b flex top-0 items-center px-8 " >
        <search className=" w-[30rem] h-8 border rounded flex items-center relative overflow-hidden">
          <span className="px-2 absolute ">
            <Search className="w-4 h-4"></Search>
          </span>
          <input className="w-full h-full pl-8 text-sm bg-neutral-50" placeholder="Pesquisar animal por nome">
          </input>
          <button className="flex gap-2 absolute items-center right-0 top-0 px-2 h-full border-l">
            <span className="text-sm">Filtrar</span>
            <ChevronDown className=" w-4 h-4"/>
          </button>
        </search>
        </header>
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
        <section className="p-8">
          <AnimalGrid />
        </section>
      </div>
  

  )
}

