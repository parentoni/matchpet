import { useEffect, useState } from "react";
import { PageLayout } from "../../elements/PageLayout";
import { IAnimalDTO } from "../../utils/dtos/AnimalDTO";
import { Animal } from "../../utils/domain/Animal";

export function PartnerAnimalManage () {

  const [page, setPage] = useState<number>(0)
  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])

  useEffect(() => {
    Animal.getAll(page, {}).then((response) => {
      if (response.isLeft()) {
        alert("Erro lendo animais.")
      } else {
        setAnimalsCount(response.value.count)
        setAnimals(animals => [...animals, ...response.value.animals])
      }

    })
  }, [page])

  return (
  <PageLayout>
    <h1 className="text-2xl font-medium">{animalsCount} animais cadastrados em sua ong.</h1>
  </PageLayout>)
}