import { useState } from "react"

export function AnimalDescription ({description}: {description: string})  {
  
  const [isOpen, setIsOpen] = useState(false)
  const mimifiedVersion = description.slice(0,200)
  const hasMore = description.length > 200
  return (
    <div className="px-8">
      <h2 className="text-2xl">Sobre o animal</h2>
      <div className="text-sm pt-2 text-justify" onClick={() => {setIsOpen(!isOpen)}}>
        {isOpen?description:mimifiedVersion }
        {hasMore?<span className="">...</span>:""}
        </div>
    </div>
  )
}