import { Dialog} from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { TransitionedModal } from '../TransitionedModal'
export function AnimalFilters ()  {
  
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AnimalFiltersButton setIsOpen={setIsOpen}/>
      <AnimalFiltersModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )

}

function AnimalFiltersModal ({isOpen, setIsOpen}:  {isOpen: boolean, setIsOpen: (open: boolean) => void}) {
  return (
    <TransitionedModal isOpen={isOpen} setIsOpen={setIsOpen} panelStyle="w-full max-w-md transform overflow-hidden rounded-[10px] brute-border bg-white p-4 text-left align-middle shadow-xl transition-all">
      <Dialog.Title as='h2' className="text-xl text-gray-900">
        Adicionar filtros
      </Dialog.Title>
    </TransitionedModal>
  )
}

function AnimalFiltersButton ({setIsOpen}: {setIsOpen: (open: boolean) => void}) {
  return (
    <button className="w-full h-11 bg-black flex justify-center items-center" onClick={() => setIsOpen(true)}>
      <p className='text-white text-xl font-light'>Filtrar</p>
    </button>
  )
}