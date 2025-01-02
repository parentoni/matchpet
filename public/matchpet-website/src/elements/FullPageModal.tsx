import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { X } from "lucide-react";
import './FullPageModal.css'
export function FullPageModal ({isOpen, setIsOpen, title, children, absolute, className}: React.PropsWithChildren<{isOpen: boolean, setIsOpen: (x: boolean) => void, title:string, absolute:boolean, className?: string}>) {
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>

      <Dialog as='div' className="relative z-50 " onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <Transition.Child as={Fragment}
        enter="duration-300 ease-out"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="duration-300 in"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
        >
          <Dialog.Panel className={`fixed flex flex-col w-screen modal-height overflow-y-scroll bg-white top-0 left-0 no-scrollbar ${className}`}>
            <div className="flex-1 flex flex-col h-full">
              <Dialog.Title as="h2" className={` ${absolute && 'absolute'} top-0 left-0 flex gap-3 px-8 h-16 items-center z-50 `}onClick={() => setIsOpen(false)}>
                <X className="cursor-pointer"/>{title}
              </Dialog.Title>
                {children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}