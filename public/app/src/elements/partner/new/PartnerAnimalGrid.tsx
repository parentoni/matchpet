import { Fragment, useContext, useState } from 'react';
import './PartnerAnimalsGrid.css'
import { FiltersContext } from '../../../utils/context/FiltersContext';
import { IAnimalDTO } from '../../../utils/services/dtos/AnimalDTO';
import { CalendarDays, Eye, MousePointerSquare } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';

export const AnimalGrid = () => {

  const {animals} = useContext(FiltersContext)

  return (
    <div className="w-full grid grid-resizable-columns gap-8">
      {animals.map((animal, index) => <PartnerAnimalCard animal={animal} key={index} />)}
    </div>
  );
};

export interface PartnerAnimalCardProps {
  animal: IAnimalDTO
}
export const PartnerAnimalCard = (props: PartnerAnimalCardProps) => {

  const canBeModifiedAt = new Date(props.animal.last_modified_at)
  canBeModifiedAt.setDate(canBeModifiedAt.getDate())

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className=' bg-neutral-50 border p-4 rounded-xl flex flex-col gap-4'>
      <div className='overflow-hidden w-full aspect-video rounded-md relative flex items-center justify-center bg-neutral-200'>
        <img alt={`Imagem principal do animal ${props.animal.name}`} src={props.animal.image[0]} className=' max-w-full max-h-full object-contain'></img>
        <div>

        </div>
      </div>
      <div>
        <h3 className='font-medium'>{props.animal.name}</h3>
        <div className='flex items-center gap-1'>
          <Eye  className='w-4 h-4 fill-neutral-300'/>
          <p className='text-sm from-neutral-800'>Visualizações: <span className='text-primary  font-medium'>{props.animal.views}</span></p>
        </div>
        <div className='flex items-center gap-1'>
          <MousePointerSquare  className='w-4 h-4 fill-neutral-300'/>
          <p className='text-sm from-neutral-800'>Cliques: <span className='text-primary  font-medium'>{props.animal.clicks}</span></p>
        </div>
        <div className='flex items-center gap-1'>
          <CalendarDays className='w-4 h-4 fill-neutral-300'/>
          <p className='text-sm from-neutral-800'>Renove a partir de: <span className='text-primary  font-medium'>{canBeModifiedAt.toLocaleDateString()}</span></p>
        </div>
        
      </div>

      
    </div>
  )
}