import { useContext, useEffect, useState } from "react";
import { PageLayout } from "../../elements/PageLayout";
import { IAnimalDTO } from "../../utils/dtos/AnimalDTO";
import { Animal } from "../../utils/domain/Animal";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";

export function PartnerAnimalManage () {

  const [page, setPage] = useState<number>(0)
  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])

  const {user} = useContext(AuthContext)
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
  </PageLayout>)
}