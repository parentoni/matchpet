import { useEffect, useRef, useState } from "react"
import { ImageInput } from "../../pages/partner/PartnerEditAnimal"

export interface PartnerImageUploadProps {
  images: ImageInput[],
  setImages: (x: ImageInput[]) => void,
  imageError: boolean
}
export const PartnerImageUpload = (props: PartnerImageUploadProps) => {

  const handleFileUpload = (e:  React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files)
      props.setImages([...props.images,{"type": 'File', data: e.target.files[0]}])      
    }
  }


  const handleFileDelete = (i: number) => {
    props.images.splice(i, 1)
    props.setImages(props.images.slice())
  }


  return (
    <div className="flex flex-col gap-3">
    <div className="w-full border aspect-square rounded flex items-center justify-center flex-grow-0">
    {props.images.length > 0? 
      <div className="carousel w-full h-full">
        {props.images.map((file, i) => {
          return(
            <div className="carousel-item relative w-full aspect-square flex justify-center" id={`slide${i}`}>
              <img src={file.type === 'File'?URL.createObjectURL(file.data):file.data} className="object-contain" alt={`Imagem ${i} selecionada.`}></img>
              <button className="absolute transform h-10 bg-primary right-5 bottom-5 px-5 items-center flex" onClick={() => handleFileDelete(i)}>EXCLUIR FOTO</button>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#${i > 0?`slide${i-1}`:"uploadMore"}`} className="z-50 btn btn-circle">❮</a> 
                <a href={`#${i === props.images.length-1?`uploadMore`:`slide${i + 1}`}`} className="z-50 btn btn-circle">❯</a>
              </div>
            </div>
            )
          }
          ) }
          <div className="carousel-item relative w-full flex items-center justify-center " id="uploadMore">
            <label htmlFor="fileInput" className="lg:text-sm cursor-pointer w-full h-full text-xs text-center mt-5">Clique para adicionar mais uma imagem</label>
            <input accept="image/*" id="fileInput" type="file" className="hidden" onChange={handleFileUpload}></input>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${props.images.length - 1 }`} className="z-50 btn btn-circle">❮</a> 
              <a href="#slide0" className="z-50 btn btn-circle">❯</a>
            </div>
          </div>
      </div>
      :<>
        <label  htmlFor="fileInput" className="lg:text-sm cursor-pointer w-full h-full text-xs text-center mt-5">Clique para adicionar uma imagem</label>
        <input accept="image/*" id="fileInput" type="file" className="hidden " onChange={handleFileUpload}></input>
      </>
    }


    </div>
    {props.imageError && <span className="text-sm text-error">Por favor, selecione ao menos uma imagem.</span>}
    </div>
  )

  
}