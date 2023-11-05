import { useContext, useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";
import { Animal } from "../../utils/domain/Animal";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { PartnerAnimalGrid } from "../../elements/partner/PartnerAnimalsGrid";
import { FiltersContext } from "../../utils/context/FiltersContext";
import { useNavigate } from "react-router-dom";

export function PartnerAnimalManage () {

  const {page} = useContext(FiltersContext)

  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      Animal.getAll(page, {"donator_id": [{mode: FILTER_MODES.EQUAL, comparation_value: user._id}]}).then((response) => {
        if (response.isLeft()) {
          alert("Erro lendo animais.")
        } else {
          setAnimalsCount(response.value.count)
          setAnimals(animals => [...animals, ...response.value.animals])
        }

      })
    }
  }, [page, user])

  return (
  <PageLayout>
    <h1 className="text-2xl font-medium">{animalsCount} animais cadastrados em sua ong.</h1>
    <button className="px-4 py-1 bg-primary flex justify-center items-center mt-5" onClick={() =>  navigate('/partner/animal/new')}>
      ADICIONAR
    </button>
    <PartnerAnimalGrid animals={animals} animalsCount={animalsCount || 0} />
  </PageLayout>)
}