import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import {BsGenderFemale, BsGenderMale} from 'react-icons/bs'
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO";
import { Species } from "../../utils/domain/Species";
import { Animal } from "../../utils/domain/Animal";
import { useNavigate } from "react-router-dom";
import {Trash2, Heart, User, MoreVertical, AlertTriangle, Megaphone} from 'lucide-react'
import React, { Fragment, useContext, useState } from "react";
import { FiltersContext } from "../../utils/context/FiltersContext";
import '../partner/PartnerAnimalsGrid.css'
import { Menu, Transition } from "@headlessui/react";
import { FullPageModal } from "../FullPageModal";
import { TextArea } from "../partner/input/TextArea";
import { TextInput } from "../partner/input/TextInput";
import { Either } from "../../utils/shared/Result";

export interface AnimalGridProps {
  AnimalsArray: IAnimalDTO[],
  SpeciesArray: ISpecieDTO[],
  setPage: (x: number) => void,
  page: number, 
  loading: boolean,
}

export function AnimalGrid (props: AnimalGridProps) {
  const navigate = useNavigate()

  return (
    <div className="w-full grid-cols-1 grid gap-5 grid-resizable-columns pb-20">
      {/* <UserAnimalCardSkeleton /> */}
      {props.AnimalsArray?.length > 0 && 
        props.AnimalsArray.map((animal, index) => {

          const currentSpecie = Species.createFromDTO(props.SpeciesArray).findByID(animal.specie_id)
          const sexoTrait = currentSpecie?.getTraitByVariable('name', "Sexo")
          if (sexoTrait) {
            const selectedOptionValue = currentSpecie?.getTraitOptionValueById(sexoTrait._id, Animal.create(animal).getTraitById(sexoTrait?._id)?.value || '')
            const male = selectedOptionValue?.name === 'Fêmea' ? false:true


            return(
              <UserAnimalCard  animal={animal} navigate={navigate} male={male} />
              )
          }

          return null
          
        })
      }
      {props.loading && [...Array(50).keys()].map(_ => <UserAnimalCardSkeleton />)}
      { (props.AnimalsArray.length % 50) === 0 && props.AnimalsArray.length !== 0?
      <button className="w-full h-10 bg-black flex justify-center items-center text-white" onClick={() => props.setPage(props.page+1)}>
        Carregar mais
      </button>:''}
      

    </div>
  )
}

export interface UserAnimalCardProps {
  animal: IAnimalDTO,
  navigate:any,
  male:boolean,
}
function UserAnimalCard(props: UserAnimalCardProps) {

  const [showModal, setShowModal] = useState<boolean>(false)
  return <div className="w-full flex flex-col rounded brute-border shadow relative mt-3">
    <img src={props.animal.image[0]} alt={`Imagem de ${props.animal.name}`} className="w-full aspect-video   object-contain bg-neutral-100" onClick={() => props.navigate(`/animals/${props.animal._id}`)}></img>
    <div className="flex flex-1 flex-col p-4">
      <div className="flex justify-between items-center">
        <p className="text-xl">{props.animal.name}</p>
        {props.male ? <BsGenderMale className="text-lg" /> : <BsGenderFemale className="text-lg" />}
      </div>
      <p className="line-clamp-2 text-xs">{props.animal.description.slice(0)}</p>
      <div className="flex flex-1 justify-between items-end mt-5 gap-3">
        <button className="h-8 flex-1 rounded border flex justify-center items-center" onClick={() => props.navigate(`/animals/${props.animal._id}`)}>
          <span className="text-sm">VER MAIS</span>
        </button>
        <button className="h-8 w-8 rounded-full border flex justify-center items-center" onClick={() => setShowModal(!showModal)}>
          <Megaphone size={18}/>
        </button>
        <AnimalComplaint showModal={showModal} setShowModal={setShowModal} animalId={props.animal._id}/>
      </div>
    </div>
  </div>;
}

export const UserAnimalCardSkeleton = () => {
  return (
    <div className="w-full brute-border shadow overflow-hidden relative mt-3">
      <div className="w-full aspect-video animate-pulse bg-gray-200"></div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 w-40 animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="h-4 w-60 bg-loading animate-pulse mt-1"></div>
        <div className="flex justify-between items-center mt-5 gap-3">
          <div className="h-8 flex-1 bg-loading animate-pulse"></div>
          <div className="h-8 w-8 bg-loading animate-pulse"></div>
          <div className="h-8 w-8 bg-loading animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}


export interface AnimalComplaintProps {
  showModal: boolean,
  setShowModal: (x: boolean) => void,
  animalId: string
}
export const AnimalComplaint = (props: AnimalComplaintProps) => {

  const [textArea, setTextArea] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textArea) {
      setErrorMessage('')
      let response: Either<Response, any>
      if (email || name) {
        response = await Animal.animalComplaint(props.animalId, textArea, {phone: email || "NOEMAIL", name: name || "NONAME"})
      } else {
        response = await Animal.animalComplaint(props.animalId, textArea)
      }

      if (response.isLeft()) {
        alert("Erro gravando denuncia, contate parentoni.arthur@gmail.com")
      } else {
        alert("Denuncia computada.")
      }

      props.setShowModal(false)
    } else {
      setErrorMessage("Por favor, escreva a sua denúncia.")
    }
  }

  return (
    <FullPageModal absolute={false} setIsOpen={props.setShowModal} isOpen={props.showModal} title={"DENUNCIAR ANÚNCIO"}>
      <form className="mx-8 flex flex-col gap-5" onSubmit={onSubmit}>
        <TextArea state={textArea} onChange={e => setTextArea(e.target.value)} placeholder="O anúncio é inadequado, porque" title="Por que o anúncio é inadequado?" errorMessage={errorMessage}/>
        <TextInput state={email} onChange={e => setEmail(e.target.value)} placeholder="nome@provedor.com ou 31 999999999" title="Como podemos te contatar (opcional)"/>
        <TextInput state={name} onChange={e => setName(e.target.value)} placeholder="José da Silva" title="Seu nome (opcional)"/>

        <button className="w-full h-12 bg-primary rounded flex items-center justify-center text-white font-medium" type="submit">
          Denunciar anúncio
        </button>
        
        
      </form>
    </FullPageModal>
  )
}