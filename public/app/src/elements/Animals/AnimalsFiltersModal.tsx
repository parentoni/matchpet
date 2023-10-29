import { Dialog} from '@headlessui/react'
import React, { Fragment, useContext, useState } from 'react'
import { TransitionedModal } from '../TransitionedModal'
import { FullPageModal } from '../FullPageModal'
import { AnimalSimpleFilter } from './AnimalSpecificFilter'
import { PageLayout } from '../PageLayout'
import { AnimalFilters, FILTER_MODES } from './filters'
import { SpeciesContext } from '../../utils/context/SpeciesContext'
import { Species } from '../../utils/domain/Species'
import { Specie } from '../../utils/domain/Specie'
import { Categories } from '../../utils/domain/Categories'
import { CategoriesContext } from '../../utils/context/CategoriesContext'
import { SlideFilter } from './filters/SlideFilter'
import { FiltersContext } from '../../utils/context/FiltersContext'
import { LocationFilter } from './filters/LocationFilter'
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
  const {filters, setFilters, animalsCount} = useContext(FiltersContext)

  const specie = (Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie)
  return (

    
    <FullPageModal isOpen={isOpen} setIsOpen={setIsOpen} absolute={false} title='FILTRAR'>
      <AnimalFilters.Root selectedSpecie={Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie}>
        <LocationFilter />
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
      {/* {(Species.createFromDTO(species).findByID('6501103133585a0a7ee56570') as Specie)?.props.traits.map((trait, index) => (
        <AnimalFilters.ChoiceFilter title={trait.name} options={trait.options} trait_name={`trait_${trait._id}`}/>
      ))} */}
      </AnimalFilters.Root>

      <div className='pb-20'></div>
      <div className="sticky bottom-8 inset-0 px-8 w-full h-12 flex justify-between">
        <button className='h-full px-6 bg-black text-white items-center flex' onClick={() => setFilters({})}>
          Limpar
        </button>
        <button className='h-full px-6 bg-primary  items-center flex' onClick={() => setIsOpen(false)}>
          Mostar {animalsCount?animalsCount:'----'} animais
        </button>

      </div>

    </FullPageModal>
    
  )
}

function AnimalFiltersButton ({setIsOpen}: {setIsOpen: (open: boolean) => void}) {
  return (
    <button className="w-full h-11 bg-black flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className='text-white text-xl font-light'>Filtrar</p>
    </button>
  )
}
