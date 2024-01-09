import React, { useEffect, useId, useRef, useState } from "react"
import html2canvas from 'html2canvas'
import './DomToImage.css'
import { loadavg } from "os"
export type DomToImageProps = {
  className?: string,
  proxy?: string,
  imageName: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
  pictureSaveArray: React.MutableRefObject<(() => Promise<void>)[]> // Check this method
}
export const DomToImage = (props: React.PropsWithChildren<DomToImageProps>) => {

  const ref = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownloadClick = async () => {
    if (ref.current !== null && props.containerRef.current !== null ) {
      setLoading(true)
      const response = await html2canvas(ref.current, {
        logging:true,
        proxy: props.proxy,
        scale: 5,
        windowWidth: ref.current.scrollWidth,
        windowHeight: ref.current.scrollHeight,
        scrollX: props.containerRef.current.scrollLeft
       })
      
      const data = response.toDataURL()

      const anchor = document.createElement("a")

      anchor.href = data
      anchor.download = props.imageName
      anchor.click()
      setLoading(false)
    } 
    
  }

  useEffect(() => { 
    props.pictureSaveArray.current = [...props.pictureSaveArray.current, handleDownloadClick]
  }
  , [] )

  return (
    <div className="flex flex-col gap-1">
      <div className={` ${props.className}`} ref={ref}>
        {props.children}
      </div>
      {loading? <span className="loading loading-xs loading-spinner text-primary fill-primary"></span>:
      <button  className="text-xs text-start text-primary underline" onClick={handleDownloadClick}> Baixar imagem individualmente </button>}
    </div>
  )
}
