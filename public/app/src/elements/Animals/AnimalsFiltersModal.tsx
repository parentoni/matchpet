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

  const {filters, setFilters, loading, searchArea, animalsCount, setSearchArea} = useContext(FiltersContext)
  return (
    <>
      <AnimalFiltersButton setIsOpen={setIsOpen}/>
      <FilterModal 
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        open={isOpen}
        setIsOpen={setIsOpen}
        isPartner={false} 
        animalsCount={animalsCount} 
        searchArea={searchArea} 
        setSearchArea={setSearchArea}/>
      {/* <AnimalFiltersModal isOpen={isOpen} setIsOpen={setIsOpen}/> */}
    </>
  )

}

function AnimalFiltersModal ({isOpen, setIsOpen}:  {isOpen: boolean, setIsOpen: (open: boolean) => void}) {

  const {species}= useContext(SpeciesContext)
  const {categories} = useContext(CategoriesContext)
  const {setFilters, animalsCount, loading, searchArea, setSearchArea, filters} = useContext(FiltersContext)

  const specie = (Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie)
  return (

    <>
      {specie &&
      <FullPageModal isOpen={isOpen} setIsOpen={setIsOpen} absolute={false} title='FILTRAR' className=''>
        <div className='grid lg:grid-cols-2 grid-cols-1 h-full overflow-y-scroll w-10'>

            <AnimalFilters.Root selectedSpecie={Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie}>
              <div className='block lg:hidden w-full'>
                <LocationFilter searchArea={searchArea} setSearchArea={setSearchArea} filters={filters} setFilters={setFilters}/>
              </div>
              
              {/* <SlideFilter filters={filters} setFilters={setFilters} /> */}
              {Categories.createFromDTO(categories).list.map((category, index) => {
                return(
                  <div className='border-b flex flex-col gap-3 py-5'>
                    <h2 className='font-semibold'>{category.props.name}</h2>
                    {specie.getTraitsThatMatchCategory(category.props._id).map((trait, index) => (
                      <AnimalFilters.ChoiceFilter filters={filters} setFilters={setFilters} title={trait.name} trait_name={`trait_${trait._id}`} options={trait.options}/>
                      ))}
                  </div>
                )
              })}
            </AnimalFilters.Root>
          
            <div className='px-8 hidden lg:block'>
              <LocationFilter searchArea={searchArea} setSearchArea={setSearchArea} filters={filters} setFilters={setFilters}/>
            </div>


          </div>

        {/* </div> */}
        {/* </div> */}
            
                  
 
        <div className="px-8 w-full flex justify-between py-5 border-t ">
              <button className='h-12 px-6 bg-black text-white items-center flex' onClick={() => setFilters({})}>
                Limpar
              </button>
              <button className='h-12 px-6 bg-primary  items-center flex' onClick={() => setIsOpen(false)}>
                Mostar &nbsp;{loading?<span className='loading loading-spinner loading-xs'></span>:animalsCount || 0}&nbsp; animais
              </button>
            </div>
      </FullPageModal>
      }
    </>
    
  )
}

function AnimalFiltersButton ({setIsOpen}: {setIsOpen: (open: boolean) => void}) {
  return (
    <div className='flex gap-5'>
     <button className="w-full h-11 bg-black flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className='text-white text-xl font-light'>Filtrar</p>
    </button>
    <button className="w-full h-11 brute-border flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className=' text-xl font-light'>Ver mapa</p>
    </button>
    </div>
    
  )
}
