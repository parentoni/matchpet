import React, { useContext, useEffect, useRef, useState } from "react"
import { Image, Megaphone } from "lucide-react"
import { AnimalImageGallery } from "./AnmalImageGallery"
import { CarouselContext, CarouselProvider } from "pure-react-carousel"
import { AnimalComplaint } from "../Animals/AnimalsGrid"
import { Play, Pause } from "lucide-react"
import ReactPlayer from 'react-player'

export function AnimalImage({AnimalImages, AnimalName, AnimalId}: {AnimalImages: string[], AnimalName: string, AnimalId: string}) {

  const [galleryIsOpen, setGalleryIsOpen] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const windowWidth = useRef(window.innerWidth)

  const [showComplainModal, setShowComplaintModal] = useState<boolean>(false)

  

  
  // const vidRef = useRef<null | HTMLVideoElement>(null);
  // const handlePlayVideo = () => {
  //   if (vidRef.current !== null) {
  //     setIsPlaying(!isPlaying)
  //     if (isPlaying === true) {
        
  //       vidRef.current.pause()
  //     } else {
  //       vidRef.current.play();
  //     }
      
  //   }
  // }
 

  // console.log(AnimalId)
  return(
    <>
    
    <div className="relative  w-full overflow-hidden">
    {/* <div className="absolute bg-red-500 w-full  bottom-0 left-0 z-50 p-5 flex gap-2">
      <button className="flex items-center justify-center bg-white px-4 h-12  rounded-full gap-2" onClick={() => setGalleryIsOpen(true)}>
        <Image /> <span>{AnimalImages.length}</span> imagens


      </button>
      <button className="flex items-center justify-center bg-white h-12 w-12   rounded-full gap-2" onClick={() => setShowComplaintModal(true)}>
        <Megaphone />

      </button>
    </div> */}
      <div className="absolute w-full gap-3 bottom-0 left-0 flex z-50 items-end p-5">
        <button className="flex items-center justify-center bg-white px-4 h-12  rounded-full gap-2" 
        // onClick={() => setGalleryIsOpen(true)}
        >
          <Image /> <span>{AnimalImages.length}</span> imagens
        </button>
        <button className="flex items-center justify-center bg-white h-12 w-12   rounded-full gap-2" onClick={() => setShowComplaintModal(true)}>
          <Megaphone />
        </button>
        
      </div>

      <div className="w-full aspect-square carousel z-20">
        {AnimalImages.map((image, index) => {
          return(
            <FilePlayer image={image} index={index} AnimalName={AnimalName}/>
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
      <AnimalImageGallery isOpen={galleryIsOpen} setIsOpen={setGalleryIsOpen} AnimalImages={AnimalImages} AnimalName={AnimalName} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
      <AnimalComplaint setShowModal={setShowComplaintModal} showModal={showComplainModal} animalId={AnimalId}/>
    </CarouselProvider>
    </>
    
  )
}

const FilePlayer = ({ image, index, AnimalName } : { image : string, index : number, AnimalName : string }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const vidRef = useRef<null | HTMLVideoElement>(null);
  const handlePlayVideo = () => {
    if (vidRef.current !== null) {
      setIsPlaying(!isPlaying)
      if (isPlaying === true) {
        
        vidRef.current.pause()
      } else {
        vidRef.current.play();
      }
      
    }
  }

  useEffect(() => {
    if (vidRef.current !== null) {
    vidRef.current.load()
    }
  }, [])

  return(
    //  <div className="w-full h-full object-contain  bg-blue-500 carousel-item flex items-center justify-center">

        <div id={`imagem${index}`} className="carousel-item w-full flex relative bg-neutral-100">
          {/* <div className='h-full w-full items-center justify-center pointer-events-none'>
            
             </div> */}
          <button onClick={() => {handlePlayVideo()}} disabled={image.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) === null? false : true} className={` ${image.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) === null? "visible" : "invisible"}  self-center mr-auto ml-auto right-0 left-0 items-center justify-center  absolute bg-neutral-400 opacity-50 w-16 flex aspect-square rounded-full`}>
            {isPlaying === false?
            <Play color={"#000000"} size={42}  className=' ml-1 ' />  
            :
            <Pause color={"#000000"} size={42}  className='' />  

          }
            
          </button>
          {/* <div className="absolute w-full h-full gap-3   justify-center flex items-center p-5">
           <PlayCircle color={"#000000"} size={68} className=' absolute left-0 h-12' />  
          </div> */}
        {image.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) === null?
        // <div className=' relative w-full object-contain'>
        //                   <PlayCircle color={"#000000"} size={68} className=' absolute left-0 h-12' />  

      
        <video  onPauseCapture={() => {setIsPlaying(false)}} ref={vidRef} loop={true} muted={true} controls={false} playsInline={true} className="w-full bg-neutra-100 object-contain" >
          <source  className="w-full bg-neutra-100 object-contain" src={image}/>
        </video>
     
// </div>
          :
          <img className="w-full bg-neutral-100 object-contain" src={image} alt={`Imagem ${index} de ${AnimalName}`}></img>
        }
          </div>
      // </div>
  )
}