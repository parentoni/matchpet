import {  useContext, useEffect } from "react";
import { PageLayout } from "../../PageLayout";
import { AnimalGrid } from "../../elements/Animals/AnimalsGrid";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { AnimalFiltersModalContainer } from "../../elements/Animals/AnimalsFiltersModal";
import { Filters, FiltersContext } from "../../utils/context/FiltersContext";
import { FILTER_MODES } from "../../elements/Animals/filters";


export function AllAnimals () {

  const {species, preferredSpecie} = useContext(SpeciesContext)  
  const {persistentCounter, loading, animals, page, filters, setPage, useSetAnimalGetter, dispatch} = useContext(FiltersContext)

  useSetAnimalGetter(true)

  
  useEffect(() => {
    const obj: Filters = structuredClone(filters.current)
    if (preferredSpecie !== 'NULL' && preferredSpecie) {
      obj['specie_id'] = [{comparation_value: preferredSpecie, mode: FILTER_MODES.EQUAL}]
      filters.current = obj
    }
    dispatch(filters.current, [], true)
  }, [preferredSpecie])

  return (
    <>
      <div className="px-6 pt-8">
      <AnimalFiltersModalContainer />
      </div>
      <div className="divider mb-0"></div>
      <PageLayout>
        {!loading?<h2 className="text-2xl">{persistentCounter? persistentCounter:'---'} animais disponíveis ({Object.keys(filters).length} {Object.keys(filters).length>1?'filtros':'filtro'})</h2>:<div className=" h-6 w-full bg-loading animate-pulse"></div>}
        <AnimalGrid AnimalsArray={animals} SpeciesArray={species} loading={loading} page={page} setPage={setPage}/>
      </PageLayout>
    </>
    
  )
}
