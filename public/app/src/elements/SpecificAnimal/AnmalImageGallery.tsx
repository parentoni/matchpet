import { useContext, useEffect, useRef, useState } from "react";
import { FullPageModal } from "../FullPageModal";
import { TransitionedModal } from "../TransitionedModal";
import {CarouselContext, CarouselProvider, Image, Slide, Slider} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
export function AnimalImageGallery ({isOpen, setIsOpen, AnimalImages, AnimalName, currentSlide, setCurrentSlide}:{isOpen: boolean, setIsOpen: (x: boolean) => void, AnimalImages: string[], AnimalName:string, currentSlide: number, setCurrentSlide: (x: number) => void}) {
  const windowWidth = useRef(window.innerWidth)
  const carouselContext = useContext(CarouselContext)

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    console.log(carouselContext)
    return () => carouselContext?.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <FullPageModal isOpen={isOpen} setIsOpen={setIsOpen} title="FOTOS" absolute>
      <div className="flex flex-col  justify-between w-full h-full">
        <div></div>
        
          <Slider>
            {AnimalImages.map((image, index) => (
              <Slide index={index} className="w-full aspect-video bg-[#D9D9D9]">
                <Image hasMasterSpinner src={image}  className=" object-contain"/>
              </Slide>
            ))}
          </Slider>
          
        <div className="h-36 flex flex-col flex-grow-0">
          <div className="w-full justify-between flex px-8">
            <p className="text-sm" onClick={() => setCurrentSlide(1)}>{AnimalName}</p>
            <p className="text-sm">{currentSlide + 1}/{AnimalImages.length}</p>
          </div>
          <div className="flex-1 flex p-2 overflow-x-scroll gap-3 no-scrollbar">
            {AnimalImages.map((image, index) => (
              <button className="focus:ring-2 h-full aspect-video bg-[#D9D9D9]" onClick={() => setCurrentSlide(index)}>
                <Image hasMasterSpinner src={image}  className=" object-contain"/>
              </button>
            ))}
          </div>
        </div>
      </div>
      

    </FullPageModal>
  )
}