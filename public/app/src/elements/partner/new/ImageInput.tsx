import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ImageFile, IMAGE_TYPES, UndefinedImage } from "../../../utils/domain/Image";
import { Image } from "../../../utils/domain/Image";

export interface ImageInputProps {
  title: string,
  errorMessage?:string,
  image: Image | undefined,
  id:number,
  setImageInputModalOpenId: (x:number) => void,
  setIsOpen: (x: boolean) => void,
  obrigatory?: boolean
}

export const ImageInput = (props: ImageInputProps) => {
  return(
    <div className="flex flex-col w-full">
      <label className={`mb-2 text-sm  ${props.errorMessage ? "text-error" : ""}`}>{props.title}  {props.obrigatory? <span className="text-primary">*</span>:''}</label>
      {props.image && props.image.type !== IMAGE_TYPES.UNDEFINED?
      <>
        <div className="w-full flex ">
          <div className={`rounded flex-1 rounded-r-none   bg-neutral-50 h-8 border-r-0  text-xs border p-2 ${props.errorMessage ? "border-error  placeholder-error" : "border-gray-300"}`}>
            <p className=" line-clamp-1">{props.image.getName()}</p>
          </div>
          <button onClick={() => {props.setImageInputModalOpenId(props.id);props.setIsOpen(true)} } type="button" className={`rounded rounded-l-none secondary-button text-primary bg-neutral-50 h-8  text-xs border p-2 ${props.errorMessage ? "border-error  placeholder-error" : "border-gray-300"}`}>
            Ver e editar imagem
          </button>
        </div>
        

      </>
      :
      <button className="secondary-button" type="button" onClick={() => {props.setImageInputModalOpenId(props.id);props.setIsOpen(true)}}>
        Adicionar imagem
      </button>
      }

        <div className="flex items-center">
          {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        </div>
    </div>
      
  )

}


export interface ImageInputModalProps {
  imageInputModalIsOpenId: number | undefined,
  setImageInputModalOpenId: (x:number | undefined) => void,
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  imagesArray: Image[],
  setImagesArray: (x:Image[]) => void
}

export const ImageInputModal = (props: ImageInputModalProps) => {

  //Set image to set position on images array, with this position given by ID props
  const changeImageArray = (e: React.ChangeEvent<HTMLInputElement>) => {

    //Check if modal is open
    if (typeof props.imageInputModalIsOpenId !== 'undefined') {

      if (!e.target.files || !e.target.files[0]) {
        return null
      }

      //Replace element (one) at index ID
      const imageFile = new ImageFile(e.target.files[0])
      props.imagesArray.splice(props.imageInputModalIsOpenId as number, 1, imageFile)

      //Trigger reload
      props.setImagesArray(props.imagesArray.slice())
    }
  }

  //Selected image, according to given image array id
  const [image, setImage] = useState<Image>(new UndefinedImage())

  useEffect(() => {
    if (typeof props.imageInputModalIsOpenId !== 'undefined') {
      const result = props.imagesArray[props.imageInputModalIsOpenId as number]
      if (result !== undefined) {
        console.log(result)
        setImage(result)
      } else {
        console.log('called')
        setImage(new UndefinedImage())
      }
    }
    }, [props.imagesArray, props.imageInputModalIsOpenId])

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => props.setIsOpen(false)}>
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
        <div className="fixed inset-0 w-full overflow-y-auto z-50">
          <div className="flex min-h-full w-full items-center justify-center p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="p-8 ">
                  {image.type !== IMAGE_TYPES.UNDEFINED ?
                    <div className="w-full h-60 border-2 border-primary  bg-opacity-10 bg-primary flex items-center justify-center rounded-lg bg-cover bg-center">
                      <img alt="Imagem selecionada do animal" className="max-w-full max-h-full object-contain" src={image.display()}></img>
                    </div>
                    :
                    <label htmlFor="IMAGE_INPUT_MODAL" className="w-full bg-primary bg-opacity-10 cursor-pointer  border-primary border-dashed border-2 rounded-lg h-60 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-medium text-primary">Arraste e solte sua imagem aqui</p>
                        <p className="text-sm text-primary">ou clique para selecionar</p>
                      </div>
                    </label>}
                </div>



                <div className="h-16 w-full border-t flex items-center justify-end px-8 gap-4">
                  {(props.imageInputModalIsOpenId !== undefined ? props.imagesArray[props.imageInputModalIsOpenId] !== undefined : false) && <button onClick={() => { delete props.imagesArray[props.imageInputModalIsOpenId as number]; props.setImagesArray(props.imagesArray.slice()); }} className="flex items-center justify-center h-8 px-2 rounded text-sm bg-red-500 text-white hover:bg-red-500 hover:bg-opacity-80 hover:border border-red-500  border">
                    Deletar
                  </button>}
                  {(props.imageInputModalIsOpenId !== undefined ? props.imagesArray[props.imageInputModalIsOpenId] === undefined : false) && <button onClick={() => props.setIsOpen(false)} className="flex items-center justify-center h-8 px-2 rounded text-sm bg-neutral-50 hover:bg-black hover:bg-opacity-5 border">
                    Fechar
                  </button>}

                  {(props.imageInputModalIsOpenId !== undefined ? props.imagesArray[props.imageInputModalIsOpenId] !== undefined : false) && <button onClick={() => { props.setIsOpen(false); }} className="primary-button h-8">
                    Salvar imagem
                  </button>}
                </div>

                <input id="IMAGE_INPUT_MODAL" value={''} className="hidden " accept="image/*" type="file" onChange={changeImageArray}></input>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
