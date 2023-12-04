import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { User } from "../../utils/domain/User"
import { Animal } from "../../utils/domain/Animal"
import { IUserPersistent } from "../../utils/services/dtos/UserDTO"
import { FILTER_MODES } from "../../elements/Animals/filters"
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { PageLayout } from "../../PageLayout"
import { AnimalGrid } from "../../elements/Animals/AnimalsGrid"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { ArrowLeft } from "lucide-react"
// import '../'
export const AllPartnerAnimals = () => {

  const { username }  = useParams() as {username:string}
  const {species } = useContext(SpeciesContext)

  const navigate = useNavigate()

  const [user, setUser] = useState<IUserPersistent>()
  const [page, setPage] = useState<number>(0)

  const [animalsCount, setAnimalsCount] = useState<number>()
  const [animals, setAnimals] = useState<IAnimalDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const routerLocation = useLocation()
  useEffect(() => {
    setLoading(true)
    User.getUserByUsername(username).then(res => {
      if (res.isLeft()) {
        alert("Usuário não encontrado.")
        return navigate('/')
      }

      setUser(res.value)

    })
  }, [username])

  useEffect(() => {
    if (user) {
      Animal.getAll(page, {'donator_id': [{mode: FILTER_MODES.EQUAL, comparation_value: user?._id}]}).then(res => {
        setLoading(false)
        if (res.isLeft()) {
          alert("Erro lendo animais do usuário.")
          return navigate('/')
        }

        setAnimals([...animals, ...res.value.animals])
        setAnimalsCount(res.value.count)
      })
    }
  }, [user, page])



  return (

    <>
      <div className="w-full flex  flex-col mt-8">
        <button className="mb-5 font-medium flex gap-2 mx-8" onClick={() => routerLocation.key !== 'default'?navigate(-1):navigate('/')}>
          <span><ArrowLeft /></span>
          Ver todos os animais disponíveis
        </button>
        <div className="w-full h-[100px] relative">
          <div className="relative h-full aspect-square postion bg-red-100 mx-8 z-50"></div>
          <div className="w-full absolute top-1/2 left-0 z-0 border-b"></div>
        </div>
      </div>    
      <PageLayout>
        <h2 className="text-2xl"> {!loading && animalsCount? animalsCount: '---'} animais disponíveis da(o) {user?.display_name}</h2>
        <AnimalGrid 
          AnimalsArray={animals}
          setAnimalsArray={setAnimals}
          loading={loading}
          page={page}
          setPage={setPage}
          SpeciesArray={species}
        />
      </PageLayout>
    </>
  )
}