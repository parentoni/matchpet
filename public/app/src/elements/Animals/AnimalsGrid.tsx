import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import {BsGenderFemale, BsGenderMale} from 'react-icons/bs'
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO";
import { Species } from "../../utils/domain/Species";
import { Animal } from "../../utils/domain/Animal";
import { useNavigate } from "react-router-dom";
import {Trash2, Heart, User} from 'lucide-react'
import { useContext } from "react";
import { FiltersContext } from "../../utils/context/FiltersContext";
import '../partner/PartnerAnimalsGrid.css'
export function AnimalGrid ({AnimalsArray, SpeciesArray, setAnimalsArray}: {AnimalsArray: IAnimalDTO[] | undefined, SpeciesArray: ISpecieDTO[], setAnimalsArray: (a: IAnimalDTO[]) => void}) {
  const navigate = useNavigate()

  const {setPage, page, animals, loading} = useContext(FiltersContext)

  return (
    <div className="w-full grid-cols-1 grid gap-5 grid-resizable-columns pb-20">
      {/* <UserAnimalCardSkeleton /> */}
      {AnimalsArray && 
        AnimalsArray.map((animal, index) => {

          const currentSpecie = Species.createFromDTO(SpeciesArray).findByID(animal.specie_id)
          const sexoTrait = currentSpecie?.getTraitByVariable('name', "Sexo")
          if (sexoTrait) {
            const selectedOptionValue = currentSpecie?.getTraitOptionValueById(sexoTrait._id, Animal.create(animal).getTraitById(sexoTrait?._id)?.value || '')
            const male = selectedOptionValue?.name === 'Fêmea' ? false:true

            const deleteFromArray = () => {
              AnimalsArray.splice(index,1)
              setAnimalsArray(AnimalsArray.slice())
            }

            return(
              <UserAnimalCard  animal={animal} navigate={navigate} male={male} deleteFromArray={deleteFromArray}/>
              )
          }

          return null
          
        })
      }
      {loading && [...Array(50).keys()].map(_ => <UserAnimalCardSkeleton />)}
      { (animals.length % 50) === 0?
      <button className="w-full h-10 bg-black flex justify-center items-center text-white" onClick={() => setPage(page+1)}>
        Carregar mais
      </button>:''}
      

    </div>
  )
}

export interface UserAnimalCardProps {
  animal: IAnimalDTO,
  navigate:any,
  male:boolean,
  deleteFromArray: () => void
}
function UserAnimalCard(props: UserAnimalCardProps) {
  return <div className="w-full brute-border shadow overflow-hidden relative mt-3">
    <img src={props.animal.image[0]} alt={`Imagem de ${props.animal.name}`} className="w-full aspect-video  object-cover" onClick={() => props.navigate(`/animal/${props.animal._id}`)}></img>
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center">
        <p className="text-xl">{props.animal.name}</p>
        {props.male ? <BsGenderMale className="text-lg" /> : <BsGenderFemale className="text-lg" />}
      </div>
      <p className="line-clamp-2 text-xs">{props.animal.description.slice(0)}</p>
      <div className="flex justify-between items-center mt-5 gap-3">
        <button className="h-8 flex-1 border flex justify-center items-center" onClick={() => props.navigate(`/animal/${props.animal._id}`)}>
          <span className="text-sm">VER MAIS</span>
        </button>
        <button className="h-8 w-8 border rounded-full flex items-center justify-center" onClick={props.deleteFromArray}>
          <Trash2 width={15} />
        </button>
        <button className="h-8 w-8 border rounded-full flex items-center justify-center" onClick={() => props.navigate(`/animal/${props.animal._id}`)}>
          <Heart width={15} />
        </button>
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