import { useContext, useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { Animal } from "../../utils/domain/Animal";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { PartnerAnimalGrid } from "../../elements/partner/PartnerAnimalsGrid";
import { FiltersContext } from "../../utils/context/FiltersContext";
import { useNavigate } from "react-router-dom";
import { FilterModal } from "../../elements/FilterModal";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO";

export function PartnerAnimalManage () {


  const [page, setPage] = useState(0)

  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<Record<string, {mode: FILTER_MODES, comparation_value:any}[]>>({})
  const [searchArea, setSearchArea] = useState<[number, number][]>([])

  const {user} = useContext(AuthContext)

  const navigate = useNavigate()


  useEffect(() => {
    setPage(0)
  }, [filters])

  useEffect(() => {
    if (user ) {
      setLoading(true)
      Animal.getAll(page, {"donator_id": [{mode: FILTER_MODES.EQUAL, comparation_value: user._id}], ...filters}, searchArea ).then((response) => {
        if (response.isLeft()) {
          alert("Erro lendo animais.")
        } else {
          setLoading(false)
          setAnimalsCount(response.value.count)
          if (page !== 0) {
            setAnimals(animals => [...animals, ...response.value.animals])
          } else {
            setAnimals(response.value.animals)
          }
          
        }

      })
    }
  }, [page, user, filters, searchArea])



  return (
  <PageLayout>
    <h1 className="text-2xl font-medium">{animalsCount} animais {filters?"correspondem aos filtros":'cadastrados'}  em sua ong.</h1>
    <div className="flex gap-5 mt-3">
      <button className="w-60 h-10 rounded text-white bg-primary flex items-center justify-center" onClick={() =>  navigate('/partner/animal/new')}>
        Adicionar
      </button>
      <button className="w-60 h-10 rounded brute-border flex items-center justify-center" onClick={() => setIsModalOpen(true)}>
        Filtrar
      </button>
      <button className="w-60 h-10 rounded brute-border flex items-center justify-center" onClick={() => navigator.clipboard.writeText(`https://www.matchpet.org/organizations/${user?.username}`).then(() => alert("Link copiado."), () => alert(`O seu link de catálogo: https://www.matchpet.org/organizations/${user?.username}`))}>
        Copiar link de catálogo
      </button>
    </div>
    <PartnerAnimalGrid animals={animals} animalsCount={animalsCount || 0} loading={loading} page={page} setPage={setPage} setFilters={setFilters}/>
    <FilterModal
      searchArea={searchArea}
      filters={filters}
      setFilters={setFilters}
      open={isModalOpen}
      setIsOpen={setIsModalOpen}
      animalsCount={animalsCount || 0}
      loading={loading}
      setSearchArea={setSearchArea}
      isPartner
      />
  </PageLayout>)
}

