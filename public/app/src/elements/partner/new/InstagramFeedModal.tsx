
import { IAnimalDTO } from "../../../utils/services/dtos/AnimalDTO";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef } from "react";

export interface InstagramFeedModalProps {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  animal: IAnimalDTO
}

export const InstagramFeedModal = (props: InstagramFeedModalProps) => {

  const firstPageRef = useRef<HTMLCanvasElement | null>(null)

  const firstPageDraw = (ctx: CanvasRenderingContext2D ) => {
    const bounds = ctx.canvas.getBoundingClientRect()
    ctx.fillStyle = '#FFF2E9'
    ctx.fillRect(0,0, bounds.width,bounds.height)

    ctx.fillStyle = "#FFFFFF"
    ctx.roundRect(140, 220, bounds.width - 140, 64, [5, 0, 0, 5]) 
    ctx.fill()
    
    ctx.fillStyle = "#FFFFFF"
    ctx.roundRect(140, 220, bounds.width - 140, 64, [5, 0, 0, 5]) 
    ctx.fill()

  }
  //First page
  useEffect(() => {
    const canvas = firstPageRef.current;
    if (canvas !== null) {
      const ctx = canvas.getContext('2d')
      if (ctx !== null) {
        firstPageDraw(ctx)
      }
    }
  }, [props.isOpen])

  return ( 
      // <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" open={props.isOpen} className="relative z-10" onClose={() => props.setIsOpen(false)}>
          {/* <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              > */}
          <div className="fixed inset-0 bg-black/25 z-40" />
        {/* </Transition.Child> */}
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              > */}
                <Dialog.Panel className="w-full flex flex-col h-[35rem] max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                  <div className="w-80 h-80 border">
                    <canvas ref={firstPageRef} width={320} height={320}></canvas>
                  </div>
                </Dialog.Panel>
            {/* </Transition.Child> */}
          </div>
        </div>
      </Dialog>
    // {/* </Transition> */}
    )
};
