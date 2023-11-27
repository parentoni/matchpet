import { useNavigate } from "react-router-dom";
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { TransitionedModal } from "../TransitionedModal";


export const PartnerSpecificAnimalCard = ({ animal }: { animal: IAnimalDTO; }) => {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="grid-resizable-cards-width rounded  brute-border " key={animal._id}>
      <img className="w-full aspect-video  object-contain bg-neutral-100" alt={`Imagem de ${animal.name}`} src={animal.image[0]}></img>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
            <div className="text-xl">{animal.name}</div>
            <div className={`flex items-center px-2 py-.5 w-auto ${animal.status === ANIMAL_STATUS.CANCELED? "text-white bg-black" : `text-black ${animal.status === ANIMAL_STATUS.PENDING? "brute-border bg-white":"bg-primary"}`}`}>
              <p className="line-clamp-2 text-xs">{animal.status === ANIMAL_STATUS.DONATED? "Doado": animal.status === ANIMAL_STATUS.PENDING? "Em adoção": "Cancelado"}</p>
            </div>
        </div>
        
        <p className="line-clamp-2 text-xs">{animal.description}</p>
        <div className="flex justify-between items-center mt-5 gap-3">
          <button className="h-8 flex-1 border flex justify-center items-center" onClick={() => navigate(`/partner/animal/${animal._id}`)}>
            <span className="text-sm">EDITAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const PartnerSpecificAnimalCardSkeleton = () => {
  return(
    <div className="grid-resizable-cards-width brute-border">
      <div className="w-full aspect-video bg-loading animate-pulse"></div>
      <div className=" flex flex-col p-4">
        <div className="flex justify-between items-center">
          <div className="h-5 w-40 bg-loading animate-pulse"></div>
          <div className="h-5 w-16 bg-loading animate-pulse"></div>
        </div>
        <div className="h-4 w-60 bg-loading animate-pulse mt-1"></div>
        <div className="mt-5 w-full h-8 bg-loading animate-pulse"></div>
      </div>
    </div>
  )
}
