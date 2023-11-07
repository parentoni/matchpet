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
export function AnimalFiltersModalContainer ()  {
  
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AnimalFiltersButton setIsOpen={setIsOpen}/>
      <AnimalFiltersModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )

}

function AnimalFiltersModal ({isOpen, setIsOpen}:  {isOpen: boolean, setIsOpen: (open: boolean) => void}) {

  const {species}= useContext(SpeciesContext)
  const {categories} = useContext(CategoriesContext)
  const {filters, setFilters, animalsCount, loading} = useContext(FiltersContext)

  const specie = (Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie)
  return (

    <>
      {specie &&
      <FullPageModal isOpen={isOpen} setIsOpen={setIsOpen} absolute={false} title='FILTRAR' className='w-full'>
        <div className='flex-col flex items-center w-full '>
          <div className='grid lg:grid-cols-2 grid-cols-1 '>
            {/* <div className='px-8'> */}
              
            {/* </div> */}

            <AnimalFilters.Root selectedSpecie={Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie}>
              <div className='block lg:hidden'>
                <LocationFilter />
              </div>
              
              <SlideFilter />
              {Categories.createFromDTO(categories).list.map((category, index) => {
                return(
                  <div className='border-b flex flex-col gap-3 py-5'>
                    <h2 className='font-semibold'>{category.props.name}</h2>
                    {specie.getTraitsThatMatchCategory(category.props._id).map((trait, index) => (
                      <AnimalFilters.ChoiceFilter title={trait.name} trait_name={`trait_${trait._id}`} options={trait.options}/>
                      ))}
                  </div>
                )
              })}
            </AnimalFilters.Root>
          
            <div className='px-8 hidden lg:block'>
              <LocationFilter />
            </div>
            <div className='pb-20 '></div>
            <div className="sticky bottom-8 inset-0 px-8 w-full h-12 flex justify-between col-span-2">
              <button className='h-full px-6 bg-black text-white items-center flex' onClick={() => setFilters({})}>
                Limpar
              </button>
              <button className='h-full px-6 bg-primary  items-center flex' onClick={() => setIsOpen(false)}>
                Mostar &nbsp;{loading?<span className='loading loading-spinner loading-xs'></span>:animalsCount || 0}&nbsp; animais
              </button>
            </div>
          </div>
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
