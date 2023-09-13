import { useParams } from "react-router-dom"
import { PageLayout } from "../elements/PageLayout"
import { useContext, useEffect, useState } from "react"
import { SpeciesContext } from "../utils/context/SpeciesContext"
import { Animal } from "../utils/domain/Animal"
import { IAnimalDTO } from "../utils/dtos/AnimalDTO"
import { AnimalImage } from "../elements/SpecificAnimal/AnimalImage"
import { CategoriesContext } from "../utils/context/CategoriesContext"
import { AnimalTraitsSlider } from "../elements/SpecificAnimal/AnimalTraitsSlider"
import { Specie } from "../utils/domain/Specie"
import { Species } from "../utils/domain/Species"
import { Categories } from "../utils/domain/Categories"

export const SpecificAnimal = () => {

  const {animalId} = useParams();
  const {species} = useContext(SpeciesContext);
  const {categories} = useContext(CategoriesContext);

  const [selectedAnimalDTO, setSelectedAnimalDTO] = useState<IAnimalDTO>()

  useEffect(() => {
    Animal.getSpecific(animalId as string).then((response) => {
      if (response.isLeft()) {
        alert("Não foi posível encontrar o animal.")
      } else {
        setSelectedAnimalDTO(response.value.props)
      }
    })
  }, [animalId])

  return(
    <>
      {selectedAnimalDTO && 
      <div className="flex flex-col gap-3">
        <div className="px-8 pt-8">
          <AnimalImage AnimalImages={selectedAnimalDTO.image} AnimalName={selectedAnimalDTO.name}/>
        </div>
        <div className="px-8">
          <h1 className="text-2xl font-normal">{selectedAnimalDTO.name}</h1>
          <p className="text-xs">Por <span className="text-primary hover:underline">TODO</span></p>
        </div>
        <AnimalTraitsSlider AnimalTraits={selectedAnimalDTO.traits} Specie={Species.createFromDTO(species).findByID(selectedAnimalDTO.specie_id) as Specie} Categories={Categories.createFromDTO(categories)}/>
      </div>}
    </>
  )
}