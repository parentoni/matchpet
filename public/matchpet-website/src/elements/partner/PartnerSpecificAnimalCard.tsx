import { useNavigate } from "react-router-dom";
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { TransitionedModal } from "../TransitionedModal";
import { Animal } from "../../utils/domain/Animal";
import { AuthContext } from "../../utils/context/AuthContext";


export const PartnerSpecificAnimalCard = ({ animal }: { animal: IAnimalDTO }) => {

  const navigate = useNavigate()

  const { getToken } = useContext(AuthContext)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [loading, setIsLoading] = useState<boolean>(false)
  const [renovatedExipringDate, setRenovatedExpiringDate] = useState<string>()

  const renovatePost = async () => {
    setIsLoading(true)
    if (!loading) {
      const response = await Animal.renovatePost(animal._id, getToken())
      if (response.isLeft()) {
        alert("Algum erro aconteceu renovando o seu anúncio. Contate: parentoni.arthur@gmail.com")
      } else {
       const date = new Date()
       date.setDate(date.getDate() + 35)
       setRenovatedExpiringDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
      }

    }

    setIsLoading(false)
  }
  return (
    <div className="grid-resizable-cards-width rounded flex flex-col brute-border " key={animal._id}>
      <img className="w-full aspect-video  object-contain bg-neutral-100" alt={`Imagem de ${animal.name}`} src={animal.image[0]}></img>
      <div className="flex flex-col p-4 flex-1">
        <div className="flex justify-between items-center">
            <div className="text-xl">{animal.name}</div>
            <div className={`flex items-center px-3 py-.5 w-auto rounded ${animal.status === ANIMAL_STATUS.CANCELED? "text-white bg-black" : `text-black ${animal.status === ANIMAL_STATUS.PENDING? "brute-border bg-white":"bg-primary text-white"}`}`}>
              <p className="line-clamp-2 text-xs">{animal.status === ANIMAL_STATUS.DONATED? "Doado": animal.status === ANIMAL_STATUS.PENDING? "Em adoção": "Cancelado"}</p>
            </div>
        </div>
        
        <p className="line-clamp-2 text-xs">{animal.status === ANIMAL_STATUS.PENDING? renovatedExipringDate?"Expira em: " + renovatedExipringDate:`Expira em: ${Animal.create(animal).getExpiringDate().getDate()}/${Animal.create(animal).getExpiringDate().getMonth() + 1}/${Animal.create(animal).getExpiringDate().getFullYear()}`: ''}</p>
        <div className="flex flex-col w-full flex-1  justify-end  items-end mt-5 gap-3">
          <button className="h-8 w-full border flex justify-center items-center" onClick={() => navigate(`/partner/animal/${animal._id}`)}>
            <span className="text-sm">EDITAR</span>
          </button>
          {animal.status === ANIMAL_STATUS.PENDING && Animal.create(animal).canRenovate() && !renovatedExipringDate &&

          <button className="h-8 w-full  flex justify-center items-center bg-primary text-white" onClick={renovatePost}>
            {loading?<span className=" loading-spinner loading loading-sm"></span>:<span className="text-sm">Renovar anúncio</span>}
          </button>
}
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
