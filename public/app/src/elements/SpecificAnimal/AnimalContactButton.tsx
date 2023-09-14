import { Dialog, Transition } from "@headlessui/react"
import { useState, Fragment } from "react"
import {BsWhatsapp} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import { IUserContactDTO } from "../../utils/dtos/UserDTO"
export function AnimalContactButton ({ContactDTO, isMale, AnimalName}: {ContactDTO: IUserContactDTO | undefined, isMale: Boolean, AnimalName:string}) {
  
  const [isOpen, setIsOpen] = useState(false)
  const messageTextWPP = `${`Olá, vi ${isMale?"o": "a"} *${AnimalName}* no aplicativo *MATCHPET* e gostaria de adota-l${isMale?"o":"a"}.`}`
  const messageTextEmail = `${`Olá, vi ${isMale?"o": "a"} ${AnimalName} no aplicativo MATCHPET e gostaria de adota-l${isMale?"o":"a"}.`}`
  return(
    <>
      <Transition appear show={isOpen} as={Fragment}>
       <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[10px] brute-border bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-gray-900"
                  >
                    Adote remi
                  </Dialog.Title>
                  <p className="text-sm">Entre em contato com os responsáveis do animal utilizando os seguintes métodos de contato:</p>
                  <ContactButton text="WHATSAPP" Icon={<BsWhatsapp className="w-[30px] h-[30px]" preserveAspectRatio="xMidYMid meet"/>} link={`https://wa.me/${ContactDTO?.phone_number}?text=${messageTextWPP}`} />
                  <ContactButton text="E-MAIL" Icon={<HiOutlineMail className="w-[30px] h-[30px]" preserveAspectRatio="xMidYMid meet"/>} link={`mailto:${ContactDTO?.email}?subject=${encodeURI(`Adoção de ${AnimalName}`)}&body=${encodeURI(messageTextEmail)}`}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
       </Dialog>
      </Transition>
      <div className="px-8 pt-2 pb-8">
        <button className="w-full h-14 brute-border rounded-xl bg-primary flex justify-center items-center cursor-pointer shadow" onClick={() => setIsOpen(!isOpen)}>
          <p>ADOTAR</p>
        </button>
      </div>
    </>
    )
}

export function ContactButton ({text, Icon, link}: {text:string, Icon: React.ReactNode, link: string}) {
  return (
    <a className="w-full h-20 brute-border rounded-[10px] mt-4 bg-primary flex items-center px-3 gap-3" href={link}>
      <div className="w-10 aspect-square bg-white brute-border rounded flex justify-center items-center">
        {Icon}
      </div>
      <h3 className="text-2xl">{text}</h3>
    </a>
  )
}