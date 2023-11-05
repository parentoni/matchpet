import { createContext, useContext, useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { AnimalGrid } from "../../elements/Animals/AnimalsGrid";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { AnimalFiltersModalContainer } from "../../elements/Animals/AnimalsFiltersModal";
import reducedLogo from '../../assets/logo-reduced.svg'
import { FiltersContext } from "../../utils/context/FiltersContext";


export function AllAnimals () {

  const {species} = useContext(SpeciesContext)
  const {animalsCount, animals, setAnimals} = useContext(FiltersContext)
  
  
  return (
    <>
      <div className="px-6 pt-8">
      <AnimalFiltersModalContainer />
      </div>
      <div className="divider mb-0"></div>
      <PageLayout>
        <h2 className="text-2xl">{animalsCount? animalsCount:'---'} animais disponíveis</h2>
        <AnimalGrid AnimalsArray={animals} SpeciesArray={species} setAnimalsArray={setAnimals}/>
      </PageLayout>
    </>
    
  )
}