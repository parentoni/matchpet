import { Disclosure} from "@headlessui/react"
import { Fragment, useState  } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
export function AnimalDescription ({description, AnimalName}: {description: string, AnimalName: string})  {
  
  const [isOpen, setIsOpen] = useState(false)
  const mimifiedVersion = description.slice(0,200)
  const hasMore = description.length > 200
  return (
    <div className="px-8">
      <h2 className="text-2xl" onClick={() => setIsOpen(!isOpen)}>{AnimalName}</h2>
      <div className="text-sm relative">
        {isOpen?description:mimifiedVersion}{hasMore && !isOpen? "...":""}
        
      </div>
      {hasMore && 
        <button className="mt-3 flex gap-1 justify-center items-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen?<ChevronUp />: <ChevronDown />}{isOpen?"Ver menos":"Ver mais"}
        </button>}

    </div>
  )
}