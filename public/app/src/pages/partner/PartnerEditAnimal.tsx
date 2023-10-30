import {useContext, useEffect, useState } from "react"
import { PartnerEditAnimalForm } from "../../elements/partner/PartnerEditAnimalForm"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { Species } from "../../utils/domain/Species"
export interface AnimalInput {
  name: string,
  description: string,
  age: number
}

export type AnimalInputError = {
  [x in keyof AnimalInput]: boolean | undefined
}

export const PartnerEditAnimal = () => {

  const [animalInput, setAnimalInput] = useState<AnimalInput>({name:'', description: '', age: 0})
  const [animalInputError, setAnimalInputError] = useState<AnimalInputError>({name: undefined, description: undefined, age: undefined})

  const {species} = useContext(SpeciesContext)

  
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  

  return (
  <div className="mt-10 flex justify-center">
    <div className="w-full max-w-4xl gap-10 flex">
        <PartnerEditAnimalForm animalInput={animalInput} setAnimalInput={setAnimalInput} animalInputError={animalInputError} formSubmit={formSubmit}/>
      <div className="flex-1 border aspect-square"></div>
    </div>
  </div>)
}



