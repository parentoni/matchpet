
import React, { useEffect, useRef, useState } from "react"
import html2canvas from 'html2canvas'
import './DomToImage.css'
import { IAnimalDTO } from "../../../utils/services/dtos/AnimalDTO"

export const ImageForExport = (props : {index : number, animal : IAnimalDTO }) => {
    const anchor = document.createElement("a")
    
    anchor.href = props.animal.imageExport[props.index]
    anchor.download = `imagem_${props.animal.name}_${props.index}`
    

      return (
        <div className=" w-full h-full">
            <img src={props.animal.imageExport[props.index]}  className='h-[300px] min-h-[300px] min-w-[300px] w-[300px]'/>
            
            <button  className="text-xs text-start text-primary underline" onClick={() => anchor.click()}> Baixar imagem individualmente </button>        
       
        </div>
)


}