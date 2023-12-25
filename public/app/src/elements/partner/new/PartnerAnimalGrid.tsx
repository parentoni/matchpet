import { Fragment, useContext, useState } from 'react';
import './PartnerAnimalsGrid.css'
import { FiltersContext } from '../../../utils/context/FiltersContext';
import { IAnimalDTO } from '../../../utils/services/dtos/AnimalDTO';
import { CalendarDays, Eye, File, Instagram, Link2, MousePointerSquare, Pen } from 'lucide-react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { InstagramFeedModal } from './InstagramFeedModal';
import { Animal } from '../../../utils/domain/Animal';

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
  const [instagramFeedModalIsOpen, setInstagramFeedModalIsOpen] = useState<boolean>(false)
  return (
    <>
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
          <button className='rounded w-full flex h-8 items-center text-white justify-center bg-primary border-primary cursor-pointer hover:bg-opacity-80' onClick={() => setIsOpen(true)}>
            Ações 
          </button>

        
        </div>
        <ActionsModal animal={props.animal} isOpen={isOpen} setIsOpen={setIsOpen} setOpenInstagramFeedModal={setInstagramFeedModalIsOpen}/>
        <InstagramFeedModal setIsOpen={setInstagramFeedModalIsOpen} isOpen={instagramFeedModalIsOpen} animal={props.animal}/>
      </>

  )
}

export interface ActionsModalProps {
  animal: IAnimalDTO,
  isOpen: boolean,
  setIsOpen: (x:boolean) => void,
  setOpenInstagramFeedModal: (x: boolean) => void
}

const ActionsModal = (props: ActionsModalProps) => {

  const closeModal = () => {
    props.setIsOpen(false)
  }

  const navigate = useNavigate()

  return (

      <Transition appear show={props.isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25 z-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              >
              <Dialog.Panel className="w-full flex flex-col h-[35rem] max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className='border-b p-8 flex gap-4 items-center '>
                  <div className='w-16 h-16 min-w-[4rem] bg-neutral-200 rounded overflow-hidden flex items-center justify-center'>
                    <img className='max-w-full max-h-full object-contain' alt={`Imagem do animal ${props.animal}`} src={props.animal.image[0]}></img>
                  </div>
                  <div className='h-full'>
                    <h2 className='font-medium text-2xl'>{props.animal.name}</h2>
                    <p className='text-sm line-clamp-2'>{props.animal.description}</p>
                    {/* <h2>{props.animal.name}</h2> */}
                  </div>
                </div>
                <div className='flex-1 px-4 py-4 flex flex-col gap-4'>
                  <div>
                    <div className='px-4'>
                      <h4 className=' uppercase font-medium text-sm  text-neutral-800'>ANIMAL</h4>
                    </div>
                    <button className='flex rounded w-full px-4 hover:bg-black hover:bg-opacity-5 gap-2 h-8 items-center'>
                      <Pen className=" w-4 h-4 fill-neutral-300"/>
                      <span className='text-sm'>Ver e editar detalhes do animal</span>
                    </button>
                    <button className='flex rounded w-full px-4 hover:bg-black hover:bg-opacity-5 gap-2 h-8 items-center' onClick={() => navigate(`/animals/${props.animal._id}`)}>
                      <File className=" w-4 h-4 fill-neutral-300"/>
                      <span className='text-sm'>Ver página do animal (recomendado apenas em celulares)</span>
                    </button>
                  </div>
                  <div>
                    <div className='px-4'>
                      <h4 className=' uppercase font-medium text-sm  text-neutral-800'>COMPARTILHAR</h4>
                    </div>
                    <button className='flex rounded w-full px-4 hover:bg-black hover:bg-opacity-5 gap-2 h-8 items-center' onClick={() => {props.setIsOpen(false);props.setOpenInstagramFeedModal(true)}}>
                      <Instagram className=" w-4 h-4 fill-neutral-300"/>
                      <span className='text-sm'>Exportar animal para post</span>
                    </button>
                    <button className='flex rounded w-full px-4 hover:bg-black hover:bg-opacity-5 gap-2 h-8 items-center'>
                      <Instagram className=" w-4 h-4 fill-neutral-300"/>
                      <span className='text-sm'>Exportar animal para stories</span>
                    </button>
                    <button className='flex rounded w-full px-4 hover:bg-black hover:bg-opacity-5 gap-2 h-8 items-center'>
                      <Link2 className=" w-4 h-4 "/>
                      <span className='text-sm' onClick={() => navigator.clipboard.writeText(`https://www.matchpet.org/animals/${props.animal._id}`).then(() => alert("Link copiado para a área de transferência"))}>Copiar link da página do animal</span>
                    </button>
                  </div>
                  
                </div>
              </Dialog.Panel>
            </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

