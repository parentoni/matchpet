
import { IAnimalDTO } from "../../../utils/services/dtos/AnimalDTO";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef } from "react";
import { MainPicture } from "./InstagramFeed/MainPicture";
import { AuthContext } from "../../../utils/context/AuthContext";
import { IUserPersistent } from "../../../utils/services/dtos/UserDTO";

export interface InstagramFeedModalProps {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  animal: IAnimalDTO
}

export const InstagramFeedModal = (props: InstagramFeedModalProps) => {
  
  const {user} = useContext(AuthContext)

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
                <Dialog.Panel className="w-full flex flex-col h-[35rem] max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                   <MainPicture user={user as IUserPersistent} animal={props.animal} /> 
                </Dialog.Panel>
            </Transition.Child> 
          </div>
        </div>
      </Dialog>
    </Transition> 
    )
};
