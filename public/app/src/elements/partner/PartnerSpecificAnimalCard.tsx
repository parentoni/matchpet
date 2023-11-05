import { useNavigate } from "react-router-dom";
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { TransitionedModal } from "../TransitionedModal";


export const PartnerSpecificAnimalCard = ({ animal }: { animal: IAnimalDTO; }) => {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="grid-resizable-cards-width  brute-border " key={animal._id}>
      <img className="w-full aspect-video bg-cover" alt={`Imagem de ${animal.name}`} src={animal.image[0]}></img>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
            <div className="text-xl">{animal.name}</div>
            <div className={`flex items-center px-2 py-.5 w-auto ${animal.status === ANIMAL_STATUS.CANCELED? "text-white bg-black" : `text-black ${animal.status === ANIMAL_STATUS.PENDING? "brute-border bg-white":"bg-primary"}`}`}>
              <p className="line-clamp-2 text-xs">{animal.status === ANIMAL_STATUS.DONATED? "Doado": animal.status === ANIMAL_STATUS.PENDING? "Em adoção": "Excluído"}</p>
            </div>
        </div>
        
        <p className="line-clamp-2 text-xs">{animal.description}</p>
        <div className="flex justify-between items-center mt-5 gap-3">
          <button className="h-8 flex-1 border flex justify-center items-center" onClick={() => navigate(`/partner/animal/${animal._id}`)}>
            <span className="text-sm">EDITAR</span>
          </button>
        </div>
      </div>
      {/* <PartnerSpecificAnimalCardDesambiguationModal open={showModal} setOpen={setShowModal} id={animal._id} /> */}
    </div>
  );
};

export interface  PartnerSpecificAnimalCardDesambiguationModalProps {
  open: boolean,
  setOpen: (x: boolean) => void,
  id: string
}

// export const PartnerSpecificAnimalCardDesambiguationModal = (props: PartnerSpecificAnimalCardDesambiguationModalProps) => {
  
//   const navigate = useNavigate()
//   const [situationClicked, setSituationClicked] = useState<boolean>(false)

//   useEffect(() => {
//     if (!props.open) {
//       setSituationClicked(false)
//     }
//   }, [props.open])
//   return (
//   <TransitionedModal isOpen={props.open} setIsOpen={props.setOpen} panelStyle="p-4 brute-border bg-white items-start flex flex-col gap-4">
    
//     {situationClicked?
//     <>
//       <Dialog.Title className={''}>Qual é a nova situação do animal?</Dialog.Title>
//       <button className="px-4 py-0.5 brute-border">
//         Excluído
//       </button>
//       <button className="px-4 py-0.5 brute-border">
//         Em adoção 
//       </button>
//       <button className="px-4 py-0.5 brute-border">
//         Doado
//       </button>
//     </>:
//     <>
//         <Dialog.Title className={'font-medium'}>O que deseja editar?</Dialog.Title>
//         <button className="px-4 py-0.5 brute-border" onClick={() => navigate(`/partner/animal/${props.id}`)}>
//           Características do animal (Ex: NOME, IMAGEM...)
//         </button>
//         <button className="px-4 py-0.5 brute-border bg-black text-white" onClick={() => setSituationClicked(true)}>
//           Situacao do animal (Ex: ADOTADO, EXCLUIR...)
//         </button>
//     </> 
//     }

//   </TransitionedModal>)
// }
