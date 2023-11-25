import { createContext, useContext, useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { AnimalGrid } from "../../elements/Animals/AnimalsGrid";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { AnimalFiltersModalContainer } from "../../elements/Animals/AnimalsFiltersModal";
import reducedLogo from '../../assets/logo-reduced.svg'
import { FiltersContext } from "../../utils/context/FiltersContext";


export function AllAnimals () {

  const {species} = useContext(SpeciesContext)
  const {animalsCount, animals, setAnimals, loading, page, setPage, filters} = useContext(FiltersContext)
  
  console.log(filters)
  return (
    <>
      <div className="px-6 pt-8">
      <AnimalFiltersModalContainer />
      </div>
      <div className="divider mb-0"></div>
      <PageLayout>
        <h2 className="text-2xl">{animalsCount? animalsCount:'---'} animais disponíveis ({Object.keys(filters).length} {Object.keys(filters).length>1?'filtros':'filtro'})</h2>
        <AnimalGrid AnimalsArray={animals} SpeciesArray={species} setAnimalsArray={setAnimals} loading={loading} page={page} setPage={setPage}/>
      </PageLayout>
    </>
    
  )
}