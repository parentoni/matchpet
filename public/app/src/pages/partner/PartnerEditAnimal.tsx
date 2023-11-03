import {useContext, useEffect, useState } from "react"
import { PartnerEditAnimalForm } from "../../elements/partner/PartnerEditAnimalForm"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { Species } from "../../utils/domain/Species"
import { Specie } from "../../utils/domain/Specie"
import { PartnerImageUpload } from "../../elements/partner/PartnerImageUpload"
import { CarouselProvider } from "pure-react-carousel"
import { useParams } from "react-router-dom"
import { SaveAnimalStateModal } from "../../elements/partner/SaveAnimalModal"
export interface AnimalInput {
  name: string,
  description: string,
  age: number
}


export type ImageInput = {
  type: 'url',
  data: string
} | {
  type: 'File',
  data:File
}

export  type SpecieInputTraitsProps = Record<string, {name:string, _id:string}>
export  type SpecieInputTraitsErrors = Record<string, boolean | undefined>
export type AnimalInputError = {
  [x in keyof AnimalInput]: boolean | undefined
}

export const PartnerEditAnimal = () => {

  const {id} = useParams()

  const [animalInput, setAnimalInput] = useState<AnimalInput>({name:'', description: '', age: 0 })
  const [animalInputError, setAnimalInputError] = useState<AnimalInputError>({name: undefined, description: undefined, age: undefined})

  const [specie, setSelectedSpecie] = useState<Specie>()
  const [specieError, setSpecieError] = useState<boolean>(false)

  const [traits, setSelectedTraits] = useState<SpecieInputTraitsProps>({}) 
  const [traitsError, setSelectedTraitsError] = useState<SpecieInputTraitsErrors>({}) 

  const [images, setImages] = useState<ImageInput[]>([])
  const [imageError, setImageError] = useState<boolean>(false)
  const {species} = useContext(SpeciesContext)

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [modalPercentage, setModalPercentage] = useState<number>(0)
  const [modalText, setModalText] = useState<string>('')

  console.log(animalInputError)
  

  const formValidate = () => {
    let err = -1
    for (const input of Object.keys(animalInput)) {
      const val = animalInput[input as keyof AnimalInput]
      if (!val) {
        err++
        animalInputError[input as keyof AnimalInput] = true
      } else {
        animalInputError[input as keyof AnimalInput] = false
      }
      
      animalInputError['age'] = false

    }
    setAnimalInputError(structuredClone(animalInputError))

    if (!specie) {
      err++
      setSpecieError(true)
    } else {
      setSpecieError(false)

      for (const trait of specie.obrigatoryTraits) {
        // console.log(Object.keys(traits))
        if (!Object.keys(traits).includes(trait._id)) {
          err++
          traitsError[trait._id] = true
        } else {
          traitsError[trait._id] = false
        }

      }

      setSelectedTraitsError(structuredClone(traitsError))
    }

    if (images.length === 0) {
      setImageError(true)
    } else {
      setImageError(false)
    }

    return err

  
  }
  const formSubmit = () => {
    const err = formValidate()
    if (err === 0) {
      setModalIsOpen(true)
    }
  }
    //validate animals input

  return (
    <>
  <div className="my-10 flex justify-center">
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-semibold  mb-2">{id === 'new'?"Criar animal":"Editar animal"}</h2>
      <div className="grid grid-cols-2 gap-10">

      <div className="flex flex-1 flex-col">
        <PartnerEditAnimalForm
          animalInput={animalInput} 
          setAnimalInput={setAnimalInput} 
          animalInputError={animalInputError} 
          
          species={Species.createFromDTO(species)} 
          selectedSpecies={specie} 
          setSelectedSpecies={setSelectedSpecie}
          speciesError={specieError}
          
          traits={traits}
          setTraits={setSelectedTraits}
          traitsError={traitsError}
          />
          <button className="mt-10 w-full bg-black h-10 text-white" onClick={formSubmit}>
            SALVAR
          </button>
        </div>
      <PartnerImageUpload images={images} setImages={setImages} imageError={imageError}/>
      </div>
    </div>
    
  </div>
  <SaveAnimalStateModal percentage={modalPercentage} message={modalText} open={modalIsOpen} setIsOpen={setModalIsOpen}/>
  </>
  )
}



