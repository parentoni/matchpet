import React, { useContext, useEffect, useRef, useState } from "react"
import { Image, Megaphone } from "lucide-react"
import { AnimalImageGallery } from "./AnmalImageGallery"
import { CarouselContext, CarouselProvider } from "pure-react-carousel"
import { AnimalComplaint } from "../Animals/AnimalsGrid"

export function AnimalImage({AnimalImages, AnimalName, AnimalId}: {AnimalImages: string[], AnimalName: string, AnimalId: string}) {

  const [selected, setSelected] = useState<number>(0)
  const [galleryIsOpen, setGalleryIsOpen] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const windowWidth = useRef(window.innerWidth)


  const [showComplainModal, setShowComplaintModal] = useState<boolean>(false)

  console.log(AnimalId)
  return(
    <>
    
    <div className="relative w-full aspect-square">
      <div className="absolute w-full  gap-3  bottom-0 left-0 flex items-end p-5">
        <button className="flex items-center justify-center bg-white px-4 h-12  rounded-full gap-2" onClick={() => setGalleryIsOpen(true)}>
          <Image /> <span>{AnimalImages.length}</span> imagens
        </button>
        <button className="flex items-center justify-center bg-white h-12 w-12   rounded-full gap-2" onClick={() => setShowComplaintModal(true)}>
          <Megaphone />
        </button>
      </div>

      <div className="w-full aspect-square carousel z-20">
        {AnimalImages.map((image, index) => (
          <div id={`imagem${index}`} className="carousel-item w-full bg-neutral-100">
            <img className="w-full bg-neutra-100 object-contain" src={image} alt={`Imagem ${index} de ${AnimalName}`}></img>
            </div>
        ))}
        
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
      <AnimalImageGallery isOpen={galleryIsOpen} setIsOpen={setGalleryIsOpen} AnimalImages={AnimalImages} AnimalName={AnimalName} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
      <AnimalComplaint setShowModal={setShowComplaintModal} showModal={showComplainModal} animalId={AnimalId}/>
    </CarouselProvider>
    </>
    
  )
}
