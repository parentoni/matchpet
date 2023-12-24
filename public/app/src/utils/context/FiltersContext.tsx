import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { FILTER_MODES } from "../../elements/Animals/filters"
import { ANIMAL_STATUS, IAnimalDTO } from "../services/dtos/AnimalDTO"
import { Animal } from "../domain/Animal"
import { AuthContext } from "./AuthContext"

// export interface ContextProps {
  // sketchFilters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  // setSketchFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  // filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  // animalsCount:number,
  // animals:IAnimalDTO[],
  // // setAnimals: (x: IAnimalDTO[]) => void,
  // page: number,
  // setPage: (x: number) => void,
  // searchArea: [number, number][],
  // setSearchArea: (x: [number, number][]) => void
  // countLoading: boolean,
  // animalLoading: boolean,
  // findAnimals: (filter:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void
// }


// export const FiltersContext = createContext<ContextProps>({countLoading: true, filters: {}, animalLoading: true, sketchFilters: {}, setSketchFilters: () => {}, animalsCount:-1, searchArea: [], setSearchArea: () => {}, findAnimals: () => {}, page: 0, setPage: () => {}, animals: []})
// export const FiltersContextProvider = ({children}: React.PropsWithChildren<{}>) => {


//   const [countLoading, setCountLoading] = useState<boolean>(false)
//   const [animalLoading, setAnimalsLoading] = useState<boolean>(false)

//   const [filters, setFilters] = useState<Record<string, {mode: FILTER_MODES, comparation_value:any}[]>>({})
//   const [sketchFilters, setSketchFilters] = useState<Record<string, {mode: FILTER_MODES, comparation_value:any}[]>>({})

//   const [searchArea, setSearchArea] = useState<[number, number][]>([])

//   const [animalsCount, setAnimalsCount] = useState<number>(-1)
//   const [sketchCount, setSketchCount] = useState<number>(-1)
  
//   const [animalsCountCache, setAnimalsCountCache] = useState<Record<string, number>>({})

//   const [animals, setAnimals] = useState<IAnimalDTO[]>([])
//   const [animalsCache, setAnimalsCache] = useState<Record<string,IAnimalDTO[]>>({})

//   const [page, setPage] = useState<number>(0)

//   /**
//    * Count filter results
//    * Should run in every change of the filters
//    */

//   const createCountCacheKey = () => {
//     return JSON.stringify({filters: filters, searchArea: searchArea})
//   }
//   const createAnimalCacheKey = () => {
//     return JSON.stringify({filters: filters, searchArea: searchArea, page: page})
//   }


//   useEffect(() => {
//       if (sketchFilters && searchArea) {
//         if (typeof animalsCountCache[createCountCacheKey()] === "undefined") {
//           setCountLoading(true)
//           Animal.count(sketchFilters, searchArea).then(res => {
//             if (res.isLeft()) {
//               alert('Erro lendo animais.')
//             } else {
//               setSketchCount(res.value.count)
//               // Cache response
//               animalsCountCache[createCountCacheKey()] = res.value.count
//             }
//           })
//         } else {
//           setSketchCount(animalsCountCache[createCountCacheKey()])
//         }
//       }
//       setCountLoading(false)
//   }, [sketchFilters, searchArea])

//   /**
//    * Set the Animals for giver filters
//    */

//   const findAnimals = (filter: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>):void => {
//     // if (!animalLoading) {
//     //   setAnimalsLoading(true)
//     //   if (typeof animalsCache[createAnimalCacheKey()] === "undefined") {
//     //     console.log(animalsCache[createAnimalCacheKey()],createAnimalCacheKey(), animalsCache)
//     //     Animal.getAll(page, filter, searchArea).then(res => {
//     //       if (res.isLeft()) {
//     //         alert("Erro lendo animais")
//     //       } else {
  
//     //         setAnimals(res.value.animals)
//     //         //Cache response
//     //         animalsCache[createAnimalCacheKey()] = res.value.animals
//     //         setAnimalsCache(structuredClone(animalsCache))
//     //       }
//     //     })
//     //   } else {
//     //     setAnimals(animalsCache[createAnimalCacheKey()])
//     //   }
//     setSketchFilters(filter)
//   }

//   useEffect(() => {
//       if (filters && searchArea) {
//         if (typeof animalsCountCache[createCountCacheKey()] === "undefined") {
//           setCountLoading(true)
//           Animal.count(filters, searchArea).then(res => {
//             if (res.isLeft()) {
//               alert('Erro lendo animais.')
//             } else {
//               setAnimalsCount(res.value.count)
//               // Cache response
//               animalsCountCache[createCountCacheKey()] = res.value.count
//             }
//           })
//         } else {
//           setAnimalsCount(animalsCountCache[createCountCacheKey()])
//         }
//       }
//       setCountLoading(false)
//   }, [filters, searchArea])

//   useEffect(() => {
//     if (!animalLoading) {
//         setAnimalsLoading(true)
//         if (typeof animalsCache[createAnimalCacheKey()] === "undefined") {
//           console.log(animalsCache[createAnimalCacheKey()],createAnimalCacheKey(), animalsCache)
//           Animal.getAll(page, filters, searchArea).then(res => {
//             if (res.isLeft()) {
//               alert("Erro lendo animais")
//             } else {
    
//               setAnimals(res.value.animals)
//               //Cache response
//               animalsCache[createAnimalCacheKey()] = res.value.animals
//               setAnimalsCache(structuredClone(animalsCache))
//             }
//           })
//         } else {
//           setAnimals(animalsCache[createAnimalCacheKey()])
//         }
//       }
//   }, [filters])


  // return (
  //   <FiltersContext.Provider value={{ sketchFilters, setSketchFilters,filters, animalsCount, searchArea, setSearchArea, findAnimals, page, setPage, animals, animalLoading, countLoading}}>
  //     {children}
  //   </FiltersContext.Provider>
  // )
// }

export type Filters = Record<string, {mode: FILTER_MODES, comparation_value:any}[]>
export type CountCache = Record<string, number>
export type AnimalsCache = Record<string, IAnimalDTO[]>

export interface ContextProps {
  useCreateVisualFilter: () => [Filters, (x: Filters) => void],
  useCreateVisualCounter: () => [number, (x: number) => void],
  useCreateVisualCoordinates: () => [[number, number][], (x:[number, number][]) => void]
  useCountVisual: (filter: Filters, setCount: (x: number) => void, coordinates: [number, number][]) => void,
  useSetAnimalGetter: () => void
  dispatch: (filter: Filters, coordinates: [number, number][]) => void,
  countFilters: (exclude: string[]) => number
  setPage: (x: number) => void,
  persistentCounter: number | undefined,
  loading: boolean,
  animals: IAnimalDTO[],
  page: number,
  filters: React.MutableRefObject<Filters>,
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
  persistentCounter: undefined,
  loading: true,
  animals: [],
  page: 0,
  filters: {current: {}},
})

export const FiltersContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  const {user} = useContext(AuthContext)
  // Persistent filters. Used for fetching
  const filters = useRef<Filters>({})
  const coordinates = useRef<[number,number][]>([])
  
  console.log(filters)
  const [persistentCounter, setPersistentCounter] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])
  const [page, setPage] = useState<number>(0)

  const countCache = useRef<CountCache>({})
  const animalCache = useRef<AnimalsCache>({})
  const [loading, setLoading] = useState(false)
  

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

  const dispatch = (filter: Filters, coordinatesV: [number, number][]) => {

      filters.current = filter
      coordinates.current = coordinatesV
      if (JSON.stringify(filters.current) !== JSON.stringify(filter)) {
        setPage(0)
      } 
      count(filter, setPersistentCounter, coordinatesV)
      getAnimals(filter, coordinatesV)
    
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

  const getAnimals = (filter: Filters, coordinatesV: [number, number][]) => {
    setLoading(true)
    if (typeof animalCache.current[createAnimalCacheKey(filter,coordinatesV)] === 'undefined') {
      
      Animal.getAll(page, filter,coordinatesV, undefined).then(res => {
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
      })
    } else {
      setAnimals(animalCache.current[createAnimalCacheKey(filter, coordinatesV)])
    }
    setLoading(false)
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
  const useSetAnimalGetter = () => {
    useEffect(() => {
      if (page !== 0) {
        count(filters.current, setPersistentCounter, coordinates.current)
        getAnimals(filters.current ,coordinates.current)
      }
    }, [page])
  }


  return (
    <FiltersContext.Provider value={{useCreateVisualFilter, dispatch, useCreateVisualCounter, useCountVisual, persistentCounter, loading, animals, page, setPage, filters, useCreateVisualCoordinates, useSetAnimalGetter, countFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}