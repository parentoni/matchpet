import { useParams } from "react-router-dom"
import { PageLayout } from "../elements/PageLayout"
import { useContext, useEffect, useState } from "react"
import { SpeciesContext } from "../utils/context/SpeciesContex"
import { Animal } from "../utils/domain/Animal"
import { IAnimalDTO } from "../utils/dtos/AnimalDTO"
import { AnimalImage } from "../elements/SpecificAnimal/AnimalImage"

export const SpecificAnimal = () => {

  const {animalId} = useParams()
  const {species} = useContext(SpeciesContext)

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
    <PageLayout>
      {selectedAnimalDTO && 
      <div className="flex flex-col gap-3">
        <AnimalImage AnimalImages={selectedAnimalDTO.image} AnimalName={selectedAnimalDTO.name}/>
        <div>
          <h1 className="text-2xl font-normal">{selectedAnimalDTO.name}</h1>
          <p className="text-xs">Por <span className="text-primary hover:underline">TODO</span></p>
        </div>
        <div className="w-full h-10 bg-red-50"></div>
      </div>}
    </PageLayout>
  )
}