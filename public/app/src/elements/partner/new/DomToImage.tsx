import { useEffect, useRef } from "react"
import html2canvas from 'html2canvas'
import './DomToImage.css'
export type DomToImageProps = {
  className?: string,
  proxy?: string,
  imageName: string
}
export const DomToImage = (props: React.PropsWithChildren<DomToImageProps>) => {

  const ref = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (ref.current !== null ) {

      // Ensure window is in right position
      window.scrollTo(0,0)

      html2canvas(ref.current, {
        logging:true,
        proxy: props.proxy,
        scale: 5
       }).then(res=> {
          const data = res.toDataURL()

          if (anchorRef.current !== null) {
            anchorRef.current.href = data
            anchorRef.current.download = props.imageName
          }
          
        
         })
    } 
  }, [])
  return (
    <div className="flex flex-col gap-1">
      <div className={` ${props.className}`} ref={ref}>
        {props.children}
      </div>
      <a href="" ref={anchorRef} target="" className="text-primary underline text-xs"> Baixar imagem individualmente </a>
    </div>
  )
}
