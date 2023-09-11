import { useParams } from "react-router-dom"
import { PageLayout } from "../elements/PageLayout"

export const SpecificAnimal = () => {

  const {animalId} = useParams()
  alert(animalId)
  return(
    <PageLayout>
      <div>oi</div>
    </PageLayout>
  )
}