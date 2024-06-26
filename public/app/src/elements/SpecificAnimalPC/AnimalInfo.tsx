import { Disclosure} from "@headlessui/react"
import { Fragment, useState  } from "react"
import { Megaphone } from "lucide-react";
import { AnimalComplaint } from "../Animals/AnimalsGrid";
import { ChevronDown, ChevronUp } from "lucide-react"
export function AnimalInfoPC ({description, AnimalName, AnimalSex, AnimalSpecie, AnimalId}: {description: string, AnimalName: string, AnimalSex : string, AnimalSpecie : string, AnimalId : string})  {
  const [showComplainModal, setShowComplaintModal] = useState<boolean>(false)

  return (
    <div className="px-8 flex flex-col gap-1">
      <h2 className="text-4xl flex gap-2" >{AnimalName}
      <button className="flex items-center justify-center bg-neutral-100 h-12 w-12   rounded-full gap-2" onClick={() => setShowComplaintModal(true)}>
                <Megaphone />
                </button>
      </h2>

      

      <h3 className="text-xl  text-gray-500">{AnimalSpecie} | {AnimalSex}</h3>
      <h2 className="text-2xl text-primary font-semibold">Descrição:</h2>

      <div className="text-xl relative">
        {description}
      </div>
     
      <AnimalComplaint setShowModal={setShowComplaintModal} showModal={showComplainModal} animalId={AnimalId}/>

    </div>
  )
}