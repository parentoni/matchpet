import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { FILTER_MODES } from "../../elements/Animals/filters"
import { ANIMAL_STATUS, IAnimalDTO } from "../services/dtos/AnimalDTO"
import { Animal } from "../domain/Animal"
import { AuthContext } from "./AuthContext"
import { useSearchParams } from "react-router-dom"


export type Filters = Record<string, {mode: FILTER_MODES, comparation_value:any}[]>
export type CountCache = Record<string, number>
export type AnimalsCache = Record<string, IAnimalDTO[]>

export interface ContextProps {
  useCreateVisualFilter: () => [Filters, (x: Filters) => void],
  useCreateVisualCounter: () => [number, (x: number) => void],
  useCreateVisualCoordinates: () => [[number, number][], (x:[number, number][]) => void]
  useCountVisual: (filter: Filters, setCount: (x: number) => void, coordinates: [number, number][]) => void,
  useSetAnimalGetter: (countViews:boolean) => void
  dispatch: (filter: Filters, coordinates: [number, number][], countViews:boolean) => void,
  countFilters: (exclude: string[]) => number
  setPage: (x: number) => void,
  editCachedAnimal: (animal: IAnimalDTO) => void,
  useListenForQuerySearchParams: () => void,
  persistentCounter: number | undefined,
  loading: boolean,
  animals: IAnimalDTO[],
  page: number,
  filters: React.MutableRefObject<Filters>,
  animalsLoading: boolean,
}

export const FiltersContext = createContext<ContextProps>({
  useCreateVisualFilter: () => [{}, () => {}],
  useCreateVisualCounter: () => [-1, () => {}],
  useCreateVisualCoordinates: () => [[], () => {}],
  useCountVisual: () => {},
  dispatch: () => {},
  useSetAnimalGetter: () => {},
  countFilters: () => -1,
  setPage: () => {},
  editCachedAnimal: () => {},
  useListenForQuerySearchParams: () => {},
  persistentCounter: undefined,
  loading: true,
  animals: [],
  page: 0,
  filters: {current: {}},
  animalsLoading:true,
})

export const FiltersContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  const {user} = useContext(AuthContext)
  // Persistent filters. Used for fetching
  const filters = useRef<Filters>({})
  const coordinates = useRef<[number,number][]>([])
  
  const [persistentCounter, setPersistentCounter] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])
  const [page, setPage] = useState<number>(0)

  const countCache = useRef<CountCache>({})
  const animalCache = useRef<AnimalsCache>({})
  const [loading, setLoading] = useState(false)

  const [animalsLoading, setAnimalsLoading] = useState(false)
  

  // Create cache key
  const createCountCacheKey = (filter: Filters, coordinates: [number, number][]) => {
    return JSON.stringify({filters:filter, coordinates: coordinates})
  }

  // Create cache key
  const createAnimalCacheKey = (filter: Filters, coordinates: [number, number][]) => {
    return JSON.stringify({filters:filter, page: page, coordinates})
  }

  // Create filter for visual usage
  const useCreateVisualFilter = () => {
    return useState(filters.current)
  } 

  const useCreateVisualCoordinates = () => {
    return useState(coordinates.current)
  }

  const useCreateVisualCounter = () => {
    return useState(countCache.current[createCountCacheKey(filters.current, coordinates.current)] || -1)
  } 

  const dispatch = (filter: Filters, coordinatesV: [number, number][], countViews: boolean) => {

    
      let sycnPage = page
      if (JSON.stringify(filters.current) !== JSON.stringify(filter)) {
        setPage(0)
        sycnPage = 0
      } 
    
      count(filter, setPersistentCounter, coordinatesV)
      getAnimals(filter, coordinatesV, countViews, sycnPage)

      filters.current = filter
      coordinates.current = coordinatesV
    
  }

  const count = (filter: Filters, setCount: (x: number) => void, coordinatesV: [number, number][]) => {
    // if (!loading) {
      setLoading(true)
      if (typeof countCache.current[createCountCacheKey(filter, coordinatesV)] === 'undefined') {
        if (user){
          filter = {...filter, "donator_id": [{comparation_value: user._id, mode: FILTER_MODES.EQUAL}]}
        }
        Animal.count(filter,coordinatesV).then(res => {
          if( res.isLeft()) {
            return alert("Não foi possível carregar animais.")
          }
          
          countCache.current[createCountCacheKey(filter, coordinatesV)] = res.value.count
          setCount(countCache.current[createCountCacheKey(filter, coordinatesV)])
        })

      } else {
        setCount(countCache.current[createCountCacheKey(filter,coordinatesV)])
      }

      setLoading(false)
    // }
  }

  const getAnimals = (filter: Filters, coordinatesV: [number, number][], countViews: boolean, page:number) => {
    
    if (typeof animalCache.current[createAnimalCacheKey(filter,coordinatesV)] === 'undefined') {
      
      setAnimalsLoading(true)
      Animal.getAll(page, filter,countViews, coordinatesV).then(res => {
        if (res.isLeft()) {
          return alert("Erro lendo animais.")
        }

        if (page === 0) {
          setAnimals(res.value.animals)
          animalCache.current[createAnimalCacheKey(filter, coordinatesV)] = res.value.animals
        } else {
          setAnimals([...animals, ...res.value.animals])
          animalCache.current[createAnimalCacheKey(filter, coordinatesV)] = [...animals, ...res.value.animals]

        }
        setAnimalsLoading(false)
      }).catch(err => {
        console.log(err)
        setAnimalsLoading(false)
    })
    } else {
      setAnimalsLoading(false)
      setAnimals(animalCache.current[createAnimalCacheKey(filter, coordinatesV)])
    }
  }

  // Real time animals Count 
  const useCountVisual = (filter: Filters, setCount: (x: number) => void, coordinates: [number,number][]) => {
    useEffect(() => {
        count(filter, setCount, coordinates)
    }, [filter, coordinates])
  }

  const countFilters = (exclude: string[]) => {
    let i = 0
    for(const key of Object.keys(filters.current)) {
      if (!exclude.includes(key)) {
        i++
      }
    }

    return i
  }

  //!todo Atualize
  const useSetAnimalGetter = (countViews: boolean) => {
    useEffect(() => {
      if (page !== 0) {
        count(filters.current, setPersistentCounter, coordinates.current)
        getAnimals(filters.current ,coordinates.current, countViews, page)
      }
    }, [page])
  }

  const editCachedAnimal = (animal: IAnimalDTO) => {
    for (const key of Object.keys(animalCache.current)) {
      const cachedAnimals = animalCache.current[key]
      const index = cachedAnimals.findIndex(x => x._id === animal._id)
      cachedAnimals[index] = animal
      animalCache.current[key] = cachedAnimals
      setAnimals(cachedAnimals)

    }
  }

  const useListenForQuerySearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    try {
      const result = searchParams.get('query')
      if (result !== null) {
        const resultAsObject = JSON.parse(result)
        for (const key of Object.keys(resultAsObject)) {
          filters.current[key] = resultAsObject[key]
        }
      
      }
      
    } catch (error) {
      console.log("[FiltersContext]: Unable to decode query message")
    }

  }

  return (
    <FiltersContext.Provider value={{useListenForQuerySearchParams ,animalsLoading,editCachedAnimal,useCreateVisualFilter, dispatch, useCreateVisualCounter, useCountVisual, persistentCounter, loading, animals, page, setPage, filters, useCreateVisualCoordinates, useSetAnimalGetter, countFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}
