import React, { useContext, useEffect, useRef, useState } from "react"
import { Image, Megaphone } from "lucide-react"
import { AnimalImageGallery } from "../SpecificAnimal/AnmalImageGallery"
import { CarouselContext, CarouselProvider } from "pure-react-carousel"
import { Play, Pause } from "lucide-react"
import { AnimalComplaint } from "../Animals/AnimalsGrid"
// import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator"
// import ThumbnailGenerator from "@conpago/video-thumbnail-generator"
// import { VideoThumbnail }  from "react-video-thumbnail"

export function AnimalImagePC({AnimalImages, AnimalName, AnimalId}: {AnimalImages: string[], AnimalName: string, AnimalId: string}) {

  const vidRef = useRef<null | HTMLVideoElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const windowWidth = useRef(window.innerWidth)
  const [chosenImage, setChosenImage] = useState<string>(AnimalImages[0])  
  console.log(chosenImage, "IMAGE")
  const [showComplainModal, setShowComplaintModal] = useState<boolean>(false)
  console.log(AnimalId)

  useEffect(() => {
  }, [])
  return(
    <>
    <div className='relative w-full  h-full flex-col'>
        <div className="relative w-full   ">
            {/* <div className="absolute w-full gap-3 bottom-0 left-0 flex items-end p-5">
                <button className="flex items-center justify-center cursor-default bg-white px-4 h-12  rounded-full gap-2" onClick={() => setGalleryIsOpen(true)}>
                <Image /> <span>{AnimalImages.length}</span> imagens
                </button>
                <button className="flex items-center justify-center bg-white h-12 w-12   rounded-full gap-2" onClick={() => setShowComplaintModal(true)}>
                <Megaphone />
                </button>
            </div> */}

            <div className="w-full aspect-square carousel z-20">
                
                <div id={`imagem`} className="carousel-item w-full bg-neutral-100">
                    
            {/* <FilePlayerPC image={chosenImage}/> */}

                 {chosenImage.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) === null?


                <video ref={vidRef} className="w-full bg-neutra-100 object-contain" controls={true}>
                    <source className="w-full bg-neutra-100 object-contain" src={chosenImage}/>
                </video>
            :
            <img className="w-full bg-neutra-100 object-contain" src={chosenImage} alt={`Imagem 1 de ${AnimalName}`}></img>

            } 
                </div>
            </div>
        </div>
        <div className='flex gap-4 pt-2 max-h-[30%] flex-row '>
            {AnimalImages.map((image, index) => {
                
                
                return (
            <div id={`imagem${index}`} onClick={() => {setChosenImage(AnimalImages[index]) ; vidRef.current?.load()}} className={`w-[16%] max-w-[16%] ${image === chosenImage? "ring-[3px] ring-gray-300" : ""} cursor-pointer rounded-md aspect-square bg-neutral-100`}>
                {image.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) === null? 
                    
                        
                            // <img className="w-full aspect-square rounded-md bg-neutra-100 object-contain" src={} alt={`Imagem ${index} de ${AnimalName}`}></img>
                        
                
                    <video className="w-full aspect-square rounded-md bg-neutra-100 object-contain"  controls={false}>
                        <source className="w-full aspect-square rounded-md bg-neutra-100 object-contain" src={image}/>
                    </video>    
            :
            <img className="w-full aspect-square rounded-md bg-neutra-100 object-contain" src={image} alt={`Imagem ${index} de ${AnimalName}`}></img>

            }
                

                
                </div>
                )
})}
        </div>
    </div>
    
    <CarouselProvider naturalSlideWidth={windowWidth.current}
        naturalSlideHeight={windowWidth.current}
        isIntrinsicHeight
        infinite
        totalSlides={AnimalImages.length}
        visibleSlides={1}
        currentSlide={currentSlide}
        >
    </CarouselProvider>
    </>
    
  )
}

