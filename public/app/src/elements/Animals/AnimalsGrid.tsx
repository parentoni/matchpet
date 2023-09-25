import { IAnimalDTO } from "../../utils/dtos/AnimalDTO";
import {BsGenderFemale, BsGenderMale} from 'react-icons/bs'
import { ISpecieDTO } from "../../utils/dtos/SpecieDTO";
import { Species } from "../../utils/domain/Species";
import { Animal } from "../../utils/domain/Animal";
import { useNavigate } from "react-router-dom";
import {Trash2, Heart} from 'lucide-react'
export function AnimalGrid ({AnimalsArray, SpeciesArray, setAnimalsArray}: {AnimalsArray: IAnimalDTO[] | undefined, SpeciesArray: ISpecieDTO[], setAnimalsArray: (a: IAnimalDTO[]) => void}) {
  const navigate = useNavigate()

  return (
    <div className="w-full grid-cols-1 grid gap-5">
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
              <div className="w-full brute-border shadow overflow-hidden relative mt-3" >
                <img src={animal.image[0]} alt={`Imagem de ${animal.name}`} className="w-full aspect-video  object-cover" onClick={() => navigate(`/animal/${animal._id}`)}></img>
                <div className="flex flex-col p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl">{animal.name}</p>
                    {male?<BsGenderMale className="text-lg"/>: <BsGenderFemale className="text-lg"/>}
                  </div>
                  <p className="line-clamp-2 text-xs">{animal.description.slice(0)}</p>
                  <div className="flex justify-between items-center mt-5 gap-3">
                    <button className="h-8 flex-1 border flex justify-center items-center" onClick={() => navigate(`/animal/${animal._id}`)}>
                      <span className="text-sm">VER MAIS</span>
                    </button>
                    <button className="h-8 w-8 border rounded-full flex items-center justify-center" onClick={deleteFromArray}>
                      <Trash2 width={15}/>
                    </button>
                    <button className="h-8 w-8 border rounded-full flex items-center justify-center" onClick={() => navigate(`/animal/${animal._id}`)}>
                      <Heart width={15} />
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          
        })
      }
      

    </div>
  )
}