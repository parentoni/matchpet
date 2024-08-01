import { useContext, useEffect, useState } from "react"
import { loadMesoregions, loadStates } from "../../utils/data/loadIbge"
import { IbgeState, IbgeMesoregion } from "../../utils/services/dtos/IbgeLocatin"
import { LocationContext } from "../../utils/context/LocationContext"
import { useNavigate } from "react-router-dom"

export const RegionsPage = () => {
    const navigate = useNavigate()
  const [states, setStates] = useState<IbgeState[]>()
  const [mesoRegions, setMesoRegions] = useState<IbgeMesoregion[]>()
  const [chosenState, setChosenState] = useState<IbgeState>()
    const [chosenMesoRegion, setChosenMesoRegion] = useState<IbgeMesoregion>()
  useEffect(() => {
    loadStates().then((JSONStates) => {
      setStates(JSONStates)
      setChosenState(JSONStates[0])
      loadMesoregions(JSONStates[0].id).then((mesoRegions) => {
        setMesoRegions(mesoRegions)
                setChosenMesoRegion(mesoRegions[0])
      })
    })
  },[])

    const {changeLocation} = useContext(LocationContext)
  return (
    <div>
      <div className="w-full border-b "></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Parabéns</span>, você está mudando vidas!</h1>
          <p className="mt-6 text-xl text-neutral-600">Onde iremos procurar o seu novo companheiro?</p>
          <p className="mt-8 text-sm  font-semibold mb-1 ">Áreas frequentes:</p>
          <div className="overflow-x-auto no-scrollbar h-12 gap-3 flex flex-row">
            <button onClick={() => {changeLocation({id: "3107", nome: "Metropolitana de Belo Horizonte", UF: {id: "31", sigla: "MG", nome: "Minas Gerais", regiao: {id: "3", sigla: "SE", nome: "Sudeste"}}}); navigate("/animals")}} className='px-2 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-neutral border-border rounded-xl border-2 flex justify-center items-center'>
              Região Metropolitana BH 
            </button>
            <button onClick={() => {changeLocation({id: "3515", nome: "Metropolitana de S\u00e3o Paulo", UF: {id: "35", sigla: "SP", nome: "S\u00e3o Paulo", regiao: {id: "3", sigla: "SE", nome: "Sudeste"}}}); navigate("/animals")}} className='px-2 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-neutral border-border rounded-xl border-2 flex justify-center items-center'>
              Região Metropolitana SP
            </button>
            <button onClick={() => {changeLocation({id: "3306", nome: "Metropolitana do Rio de Janeiro", UF: {id: "33", sigla: "RJ", nome: "Rio de Janeiro", regiao: {id: "3", sigla: "SE", nome: "Sudeste"}}}); navigate("/animals")}} className='px-2 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-neutral border-border rounded-xl border-2 flex justify-center items-center'>
              Região Metropolitana do RJ
            </button>
            <button onClick={() => {changeLocation({id: "2905", nome: "Metropolitana de Salvador", UF: {id: "29", sigla: "BA", nome: "Bahia", regiao: {id: "2", sigla: "NE", nome: "Nordeste"}}}); navigate("/animals")}} className='px-2 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-neutral border-border rounded-xl border-2 flex justify-center items-center'>
              Metropolitana de Salvador
            </button>
            {/* <button className='w-42 sm:w-[20%] px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Região Metropolitana de Belo Horizonte
                        </button> */}
          </div>
          <p className="mt-6 text-sm  font-semibold">OU procure sua região:</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor='state' className="text-sm font-semibold mb-1">Estado</label>
              <select id='state'onChange={(e) => {setChosenState(JSON.parse(e.target.value)); loadMesoregions(JSON.parse(e.target.value).id).then((regions) => {setMesoRegions(regions)})}}
                className="w-full max-w-lg h-10 items-center px-2 font-semibold border-2 rounded-lg bg-neutral border-border">
                {states?.map((state) => {
                  return(
                    <option value={JSON.stringify(state)}>{state.nome}</option>
                  )
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="meso" className="text-sm text-text font-semibold mb-1">Região</label>
              <select id="meso" onChange={(e) => {setChosenMesoRegion(JSON.parse(e.target.value))}} 
                className="w-full max-w-lg h-10 items-center px-2 font-semibold border-2 rounded-lg bg-neutral border-border">
                {mesoRegions?.map((region) => {
                  return(
                    <option value={JSON.stringify(region)}>{region.nome}</option>
                  )
                })}
              </select>
            
            </div>
          </div>
          <button onClick={chosenMesoRegion? () => {changeLocation(chosenMesoRegion); navigate("/animals")}: () => {}}  className="primary-button mt-8 h-12 max-w-xl w-full">Buscar</button>
        </div>
      </div>
    </div>
  )
}
