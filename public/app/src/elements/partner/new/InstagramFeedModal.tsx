
import { IAnimalDTO } from "../../../utils/services/dtos/AnimalDTO";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef, useState } from "react";
import { MainPicture } from "./InstagramFeed/MainPicture";
import { AuthContext } from "../../../utils/context/AuthContext";
import { IUserPersistent } from "../../../utils/services/dtos/UserDTO";
import { DomToImage } from "./DomToImage";
import { TraitsImage } from "./InstagramFeed/TraitsImage";
import { FinalPicture } from "./InstagramFeed/FinalPicture";
import { GalleryPicture } from "./InstagramFeed/GalleryPicture";
import { ImageForExport } from "./ImageExport";
let zip = require('jszip')

export interface InstagramFeedModalProps {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  animal: IAnimalDTO
}

export const InstagramFeedModal = (props: InstagramFeedModalProps) => {
  
  const {user} = useContext(AuthContext)

  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const pictureSaveArray = useRef<(() => Promise<void>)[]>([])
  
  const [saveAllLoading, setSaveAllLoading] = useState<boolean>(false)

  const saveAll = () => {
    let imgs = props.animal.imageExport
    let interval = setInterval(() => {
      let url : string = imgs.pop() as string

      var a = document.createElement("a");
      a.href = url
      a.download = `imagem_${props.animal.name}`
      a.setAttribute('target', '_blank');
      a.click();

      if (imgs.length === 0) {
        clearInterval(interval)
      }
    }, 300)

    // const anchor = document.createElement("a")
    
    // window.open(props.animal.imageExport[0])

    // anchor.href = props.animal.imageExport[props.index]
    // anchor.download = `imagem_${props.animal.name}_${props.index}`

    // if (!saveAllLoading) {

    //   setSaveAllLoading(true)
    //   const interval = setInterval(() => {
    
    //     if (pictureSaveArray.current[0]){
    //       pictureSaveArray.current[0]()
    //       pictureSaveArray.current.splice(0, 1)
    //     } else {
    //       setSaveAllLoading(false)
    //       clearInterval(interval)
    //     }
    //   }, 500)
    // }
  }
  
  return ( 
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" open={props.isOpen} className="relative z-10" onClose={() => props.setIsOpen(false)}>
           <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              > 
          <div className="fixed inset-0 bg-black/25 z-40" />
         </Transition.Child> 
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex min-h-full items-center justify-center p-4">
             <Transition.Child
              as={Fragment}
            enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              > 
              
                <Dialog.Panel className="w-full flex flex-col max-w-xl transform overflow-hidden rounded-2xl gap-4 bg-white shadow-xl transition-all">                
                  
                  <div className="px-6 h-16 flex items-center border-b">
                    <h1 className="text-xl font-semibold " >Exportar animal para post</h1>
                    
                  </div>
                  
                  {!props.animal.imageExport || props.animal.imageExport.length === 0? 
                  <>
                   <div className="flex flex-col gap-4 p-4">
                   <div className="flex w-full shrink-0 overflow-x-auto gap-4" ref={imageContainerRef}>
                       <DomToImage imageName={`Imagem_1_${props.animal.name}`} proxy={props.animal.image[0]} containerRef={imageContainerRef}  pictureSaveArray={pictureSaveArray}  >
                         <MainPicture user={user as IUserPersistent} animal={props.animal} />
                       </DomToImage> 
 
                       <DomToImage imageName={`Imagem_2_${props.animal.name}`} containerRef={imageContainerRef} pictureSaveArray={pictureSaveArray}>
                         <TraitsImage user={user as IUserPersistent} animal={props.animal} hasGallery={!!(props.animal.image.length > 1)}/>
                       </DomToImage>
                       {props.animal.image.length > 1 && props.animal.image.slice(1).map((imageUrl, index) => <DomToImage containerRef={imageContainerRef} proxy={imageUrl} imageName={`Imagem_${String(3 + index)}_${props.animal.name}`} pictureSaveArray={pictureSaveArray}>
                         <GalleryPicture imageUrl={imageUrl} imageIndex={index + 1} user={user as IUserPersistent} animal={props.animal} totalImages={props.animal.image.length - 1}/>                      
                       </DomToImage>)}
                       <DomToImage imageName={`Imagem_${props.animal.image.length - 1 + 3}_${props.animal.name}`} containerRef={imageContainerRef} pictureSaveArray={pictureSaveArray}>
                         <FinalPicture user={user as IUserPersistent} animal={props.animal} />
                       </DomToImage>
                     </div>
                   </div>
 
                   <div className="border-t h-16 w-full flex justify-end items-center px-4">
                     <button className="primary-button w-60" onClick={saveAll}>
                       {saveAllLoading?<span className="loading loading-spinner"></span>:"Salvar todas (.jpg)"}
                     </button>
                     </div>
                     </> :
                  <>
                  <div className="flex flex-col gap-4 p-4">
                    <div className="flex-row flex h-full  w-full overflow-x-scroll gap-4" ref={imageContainerRef}>
                      {props.animal.imageExport.map((img, index) => {
                        return (
                          <ImageForExport index={index} animal={props.animal}/>
                        )
                      })}
                      </div>
                  </div>
                 
                  <div className="border-t h-16 w-full flex justify-end items-center px-4">
                    <button className="primary-button w-60" onClick={saveAll}>
                     
                      {saveAllLoading?<span className="loading loading-spinner"></span>:"Salvar todas (.jpg)"}
                    </button>
                  </div>
                  </>
                }
                 

                  {/* <div className="flex flex-col gap-4 p-4">
                    <div className="flex-row flex h-full  w-full overflow-x-scroll gap-4" ref={imageContainerRef}>
                      {props.animal.imageExport.map((img, index) => {
                        return (
                          <ImageForExport index={index} animal={props.animal}/>
                        )
                      })} */}
                      
                     
                      {/* <DomToImage imageName={`Imagem_1_${props.animal.name}`} proxy={props.animal.imageExport[0]} containerRef={imageContainerRef}  pictureSaveArray={pictureSaveArray}  >
                        <img className="w-[1080px] h-80 absolute" src={props.animal.imageExport[0]}/>
                      </DomToImage> 

                      <DomToImage imageName={`Imagem_2_${props.animal.name}`} containerRef={imageContainerRef} pictureSaveArray={pictureSaveArray}>
                        <img className="w-[1080px] h-80 relative" src={props.animal.imageExport[1]}/>
                      </DomToImage>
                      {props.animal.image.length > 1 && props.animal.image.slice(1).map((imageUrl, index) => { if (imageUrl.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) !== null) return (
                      <DomToImage containerRef={imageContainerRef} proxy={imageUrl} imageName={`Imagem_${String(3 + index)}_${props.animal.name}`} pictureSaveArray={pictureSaveArray}>
                        <GalleryPicture imageUrl={imageUrl} imageIndex={index + 1} user={user as IUserPersistent} animal={props.animal} totalImages={props.animal.image.length - 1}/>                      
                      </DomToImage> 
                      )})
                      
                      }
                      <DomToImage imageName={`Imagem_${props.animal.image.length - 1 + 3}_${props.animal.name}`} containerRef={imageContainerRef} pictureSaveArray={pictureSaveArray}>
                        <FinalPicture user={user as IUserPersistent} animal={props.animal} />
                      </DomToImage> */}
                    {/* </div>
                  </div> */}

                  {/* <div className="border-t h-16 w-full flex justify-end items-center px-4">
                    <button className="primary-button w-60" onClick={saveAll}>
                   
                      {saveAllLoading?<span className="loading loading-spinner"></span>:"Salvar todas (.jpg)"}
                    </button>
                  </div> */}
                </Dialog.Panel>
            </Transition.Child> 
          </div>
        </div>
      </Dialog>
    </Transition> 
    )
};
