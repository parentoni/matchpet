import { useEffect, useState } from "react"
import { loadMesoregions, loadStates } from "../../utils/data/loadIbge"
import { IbgeState, IbgeMesoregion } from "../../utils/services/dtos/IbgeLocatin"

export const RegionsPage = () => {
    const [states, setStates] = useState<IbgeState[]>()
    const [mesoRegions, setMesoRegions] = useState<IbgeMesoregion[]>()
    const [chosenState, setChosenState] = useState<string>()
    useEffect(() => {
        loadStates().then((JSONStates) => {
            setStates(JSONStates)
            setChosenState(JSONStates[0].id)
            loadMesoregions(JSONStates[0].id).then((mesoRegions) => {
                setMesoRegions(mesoRegions)
            })
        })
    },[])

    return (
        <div>
            <div className="w-full border-b "></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 sm:mt-12 md:mt-24">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Parabéns</span>, você está mudando vidas!</h1>
                    <p className="sm:mt-6 mt-3 text-2xl text-neutral-600">Onde iremos procurar o seu novo parceiro?</p>
                    <p className="sm:mt-6 mt-2 text-3xl text-black font-semibold mb-1">Áreas frequentes:</p>
                    <div className="overflow-x-auto sm:overflow-hidden sm:pb-0 pb-1 sm:w-full  h-12 md:h-14 gap-3 flex flex-row ">
                        <button className='w-42 sm:w-[24%] sm:text-lg px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Grande Belo Horizonte
                        </button>
                        <button className='w-42 sm:w-[24%] sm:text-lg px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Região Metropolitana SP
                        </button>
                        <button className='w-42 sm:w-[24%] sm:text-lg px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Região Metropolitana do RJ
                        </button>
                        <button className='w-42 sm:w-[24%]  sm:text-lg px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Metropolitana do Salvador
                        </button>
                        {/* <button className='w-42 sm:w-[20%] px-1 flex-shrink-0 overflow-hidden min-w-42 min-h-full h-full bg-gray-50 bg-opacity-50 border-gray-200 rounded-xl border-2 flex justify-center items-center'>
                            Região Metropolitana de Belo Horizonte
                        </button> */}
                    </div>
                    <p className="sm:mt-6 mt-3 text-3xl text-black font-semibold mb-1">OU procure sua região:</p>
                    <p className="mt-4 text-2xl text-black font-semibold mb-1">Estado</p>
                    <select onChange={(e) => {setChosenState(e.target.value); loadMesoregions(e.target.value).then((regions) => {setMesoRegions(regions)})}} className="w-80 min-w-80 max-w-80 h-12 text-xl items-center pl-2 font-semibold border-2 rounded-lg bg-gray-50 bg-opacity-50 border-gray-200">
                        {states?.map((state) => {
                            return(
                                <option value={state.id}>{state.nome}</option>
                            )
                        })}
                    </select>
                    <p className="mt-4 text-2xl text-black font-semibold mb-1">Região</p>
                    <select onChange={(e) => {}} className="w-80 min-w-80 max-w-80 h-12 text-xl items-center pl-2 font-semibold border-2 rounded-lg bg-gray-50 bg-opacity-50 border-gray-200">
                        {mesoRegions?.map((region) => {
                            return(
                                <option value={region.id}>{region.nome}</option>
                            )
                        })}
                    </select>
                    <button className="w-full mt-8 h-16 rounded bg-primary flex items-center justify-center text-white">Buscar</button>

                </div>
            </div>
        </div>
    )
}