import React, { useEffect, useState } from "react"

export function AnimalImage({AnimalImages, AnimalName}: {AnimalImages: string[], AnimalName: string}) {

  const [selected, setSelected] = useState<number>(0)

  const decrement = () => {
    setSelected((selected - 1) < 0? AnimalImages.length - 1: selected-1)
  }

  const increment = () => {
    setSelected((selected + 1) < AnimalImages.length? selected + 1: 0)
  }

  const cacheImages = async (array:string[]) => {
    const promises = array.map((src) => {
      return new Promise<null>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(null)
        img.onerror = () => reject()
      })
    })

    await Promise.all(promises)
  }

  useEffect(() => {cacheImages(AnimalImages)}, [])
  console.log(selected)
  return(
    <div className="flex flex-col gap-2">
      <div className="w-full brute-border aspect-square rounded-[20px] overflow-hidden border-2 relative">
        <div className="absolute top-0 left-0 h-full w-1/2"  onClick={() => decrement()}></div>
        <div className="absolute top-0 left-1/2 h-full w-1/2" onClick={() => increment()}></div>

        <img src={AnimalImages[selected]} alt={`Foto ${selected+1} de ${AnimalName}`} className="object-contain" />
      </div>
      <div className="w-full flex justify-center gap-1">
        {AnimalImages.map((value, index) => (
          <div key={index} className={`w-2.5 h-2.5 rounded-full brute-border ${index === selected?"bg-primary":""}`}></div>
        ))}
      </div>
    </div>
    
  )
}