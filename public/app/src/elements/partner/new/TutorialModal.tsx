import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useSearchParams } from "react-router-dom"

/**
 * Modal that should be shown to first time partners  
 */
export const TutorialModal = () => {

  //Get search params
  const [searchParams, setSearchParams] = useSearchParams()

  const modalIsOpen = searchParams.get('tutorial') === 'true'

  function closeModal () {
    searchParams.set('tutorial', 'false')

    setSearchParams(searchParams)
  }

  return(
    <Transition appear show={modalIsOpen} as={Fragment}>
      <Dialog as="div" open={modalIsOpen} className="relative z-10" onClose={closeModal}>
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
                    <div className="flex flex-col px-6 py-4 ">
                      <h1 className="text-xl font-semibold " >Primeira vez no MatchPet?</h1>
                      <p>Veja o vídeo tutorial abaixo para se familiarizar com as principais funcionalidades do sistema.</p>
                    </div>
                    {/**/}
                  <div className="border-t h-16 w-full flex justify-end items-center px-4">
                    <button className="primary-button w-60" onClick={closeModal}>
                      Acessar sistema
                    </button>
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  )
}
