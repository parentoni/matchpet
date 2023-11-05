import {useContext, useEffect, useState } from "react"
import { PartnerEditAnimalForm } from "../../elements/partner/PartnerEditAnimalForm"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { Species } from "../../utils/domain/Species"
import { Specie } from "../../utils/domain/Specie"
import { PartnerImageUpload } from "../../elements/partner/PartnerImageUpload"
import { CarouselProvider } from "pure-react-carousel"
import { useNavigate, useParams } from "react-router-dom"
import { SaveAnimalStateModal } from "../../elements/partner/SaveAnimalModal"
import { AuthContext } from "../../utils/context/AuthContext"
import { Animal } from "../../utils/domain/Animal"
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO"
import { ANIMAL_STATUS } from "../../utils/services/dtos/AnimalDTO"
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
  const {token} = useContext(AuthContext)
  const {species} = useContext(SpeciesContext)
  
  
  const navigate = useNavigate()

  const [animalInput, setAnimalInput] = useState<AnimalInput>({name:'', description: '', age: 0 })
  const [animalInputError, setAnimalInputError] = useState<AnimalInputError>({name: undefined, description: undefined, age: undefined})

  const [specie, setSelectedSpecie] = useState<Specie>()
  const [specieError, setSpecieError] = useState<boolean>(false)

  const [traits, setSelectedTraits] = useState<SpecieInputTraitsProps>({}) 
  const [traitsError, setSelectedTraitsError] = useState<SpecieInputTraitsErrors>({}) 

  const [images, setImages] = useState<ImageInput[]>([])
  const [imageError, setImageError] = useState<boolean>(false)

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [modalPercentage, setModalPercentage] = useState<number>(.0)
  const [modalText, setModalText] = useState<string>('')

  const [animalStatus, setAnimalStatus] = useState<ANIMAL_STATUS>()

  useEffect(() => {
    if (id !==  'new' && id && species.length > 0 && images.length === 0) {
      Animal.getSpecific(id).then(res => {
        if (res.isLeft()) {
          alert("Erro lendo dados do animal.")
        } else {
          const data = res.value

          animalInput['name'] = data.props.name
          animalInput['description'] = data.props.description
          animalInput['age'] = data.props.age
          setAnimalInput(structuredClone(animalInput))
          setSelectedSpecie(Specie.create(species.find(x => x._id === data.props.specie_id) as ISpecieDTO))

          for (const trait of data.props?.traits) {
            traits[trait._id] = {_id:trait.value, name: 'Negativo'}
          }
          setSelectedTraits(structuredClone(traits))

          for (const image of data.props.image) {
            images.push({type: 'url', data: image})
          }

          setAnimalStatus(data.props.status)
          setImages(images.slice())
        }
      })
    }
  }, [id, species])

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

    console.log(specie)
    if (!specie) {
      err++
      setSpecieError(true)
    } else {
      setSpecieError(false)

      for (const trait of specie.obrigatoryTraits) {
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
      err++
      setImageError(true)
    } else {
      setImageError(false)
    }

    return err

  
  }

  const formSubmit = async () => {
    const err = formValidate()
    if (err <= 0) {
      setModalIsOpen(true)
      
      // Format images
      const imagesArray: string[] = []
      for (let i = 0; i < images.length; i++) {
        const image = images[i]

        setModalText(`Fazendo upload das imagens (${i}/${images.length})`)

        if (image.type === 'File') {
          const imagesResponse = await Animal.uploadAnimalImage(image.data, token)
          if (imagesResponse.isRight()) {
            imagesArray.push(imagesResponse.value)
          } 

        } else {
          imagesArray.push(image.data)
        }

        setModalText(`Fazendo upload das imagens (${i + 1}/${images.length})`)
        setModalPercentage(.8 / (images.length - i)) 

      }



      // Format traits
      const formatedTraits:{_id: string, value:string}[] = []
      for (const trait of Object.keys(traits)) {
        formatedTraits.push({_id: trait, value: traits[trait]._id})
      }


      setModalText("Fazendo upload do animal...")
      if (id === 'new') {
        const response = await Animal.newAnimal({name: animalInput['name'], age: animalInput['age'], specie_id: specie?.props._id , image_url: imagesArray, traits: formatedTraits, description: animalInput['description']}, token)
        if (response.isRight()) {
          setModalPercentage(1)
        } else {
          alert("Algo deu errado fazendo upload do animal.")
          navigate('/partner')
        }
      } else {

        const response = await Animal.editAnimal({name: animalInput['name'], age: animalInput['age'], specie_id: specie?.props._id , image_url: imagesArray, traits: formatedTraits, description: animalInput['description'], status: animalStatus}, token, id as string)
        if (response.isRight()) {
          setModalPercentage(1)
        } else {
          alert("Algo deu errado fazendo upload do animal.")
          navigate('/partner')
        }
      }
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

          id={id || ''}
          animalStatus={animalStatus}
          setAnimalStatus={setAnimalStatus}
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



