import { useContext, useEffect, useState } from "react";
import { PageLayout } from "../elements/PageLayout";
import { IAnimalDTO } from "../utils/dtos/AnimalDTO";
import { Animal } from "../utils/domain/Animal";
import { AnimalGrid } from "../elements/Animals/AnimalsGrid";
import { SpeciesContext } from "../utils/context/SpeciesContext";
import { AnimalFilters } from "../elements/Animals/AnimalsFilters";
import reducedLogo from '../assets/logo-reduced.svg'
export function AllAnimals () {

  const {species} = useContext(SpeciesContext)
  const [page, setPage] = useState<number>(0)

  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])

  useEffect(() => {
    Animal.getAll(page).then((response) => {
      if (response.isLeft()) {
        alert("Erro lendo animais.")
      } else {
        setAnimalsCount(response.value.count)
        setAnimals(animals => [...animals, ...response.value.animals])
      }

    })
  }, [page])
  return (
    <>
      <div className="px-6 pt-8">
        <AnimalFilters/>
      </div>
      <div className="divider mb-0"></div>
      <PageLayout>
        <h2 className="text-2xl">{animalsCount? animalsCount:'---'} animais disponíveis</h2>
        <AnimalGrid AnimalsArray={animals} SpeciesArray={species} setAnimalsArray={setAnimals}/>
      </PageLayout>
      <button className="fixed h-14 bg-primary bottom-8 right-6 shadow items-center flex px-5 py-3 gap-3">
        <img src={reducedLogo} alt="Logo reduzida matchpet" width={35}></img>
        <p className="text-xl">Match</p>
      </button>
    </>
    
  )
}