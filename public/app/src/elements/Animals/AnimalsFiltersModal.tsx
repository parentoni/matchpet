import { Dialog} from '@headlessui/react'
import React, { Fragment, useContext, useState } from 'react'
import { TransitionedModal } from '../TransitionedModal'
import { FullPageModal } from '../FullPageModal'
import { AnimalSimpleFilter } from './AnimalSpecificFilter'
import { PageLayout } from '../../PageLayout'
import { AnimalFilters, FILTER_MODES } from './filters'
import { SpeciesContext } from '../../utils/context/SpeciesContext'
import { Species } from '../../utils/domain/Species'
import { Specie } from '../../utils/domain/Specie'
import { Categories } from '../../utils/domain/Categories'
import { CategoriesContext } from '../../utils/context/CategoriesContext'
import { SlideFilter } from './filters/SlideFilter'
import { FiltersContext } from '../../utils/context/FiltersContext'
import { LocationFilter } from './filters/LocationFilter'
import { MapIcon } from 'lucide-react'
import { FilterModal } from '../FilterModal'
export function AnimalFiltersModalContainer ()  {
  
  const [isOpen, setIsOpen] = useState(false)

  // const {countLoading, searchArea, animalsCount, setSearchArea} = useContext(FiltersContext)
  const countLoading = false
  const searchArea: [number, number][] = []
  const animalsCount = 0
  const setSearchArea = () => {}


  return (
    <>
      <AnimalFiltersButton setIsOpen={setIsOpen}/>
      <FilterModal 
        
        loading={countLoading}
        open={isOpen}
        setIsOpen={setIsOpen}
        isPartner={false} 
        animalsCount={animalsCount} 
        searchArea={searchArea} 
        setSearchArea={setSearchArea}
        />
    </>
  )

}



function AnimalFiltersButton ({setIsOpen}: {setIsOpen: (open: boolean) => void}) {
  return (
    <div className='flex gap-5'>
     <button className="w-full h-11 bg-primary rounded flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className='text-white text-xl font-light'>Filtrar</p>
    </button>
    <button className="w-full h-11 brute-border rounded flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className=' text-xl font-light'>Ver mapa</p>
    </button>
    </div>
    
  )
}
