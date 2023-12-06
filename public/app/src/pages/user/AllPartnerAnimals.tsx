import { useContext, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { User } from "../../utils/domain/User"
import { Animal } from "../../utils/domain/Animal"
import { IUserPersistent } from "../../utils/services/dtos/UserDTO"
import { FILTER_MODES } from "../../elements/Animals/filters"
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { PageLayout } from "../../PageLayout"
import { AnimalGrid } from "../../elements/Animals/AnimalsGrid"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { ArrowLeft } from "lucide-react"
import Logo from '../../assets/logo.svg'
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

  const contentRef = useRef<HTMLDivElement>(null)

  const [isClamped, setClamped] = useState(false)
  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    if (contentRef && contentRef.current) {
      setClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      )
    }
  }, [user])
  useEffect(() => {
    // Thx to Liam on stack overflow
    // Function that should be called on window resize
    function handleResize() {
      if (contentRef && contentRef.current) {
        setClamped(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        )
      }
    }

    // Add event listener to window resize
    window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that it would only run on mount

  
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
      Animal.getAll(page, {'donator_id': [{mode: FILTER_MODES.EQUAL, comparation_value: user?._id}], "status": [{mode: FILTER_MODES.EQUAL, comparation_value: ANIMAL_STATUS.PENDING}]}).then(res => {
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

  useEffect(() => {
    if (contentRef && contentRef.current) {
    setClamped(
      contentRef.current.scrollHeight > contentRef.current.clientHeight
    )
    }
  }, [isExpanded])


  return (

    <>
      <div className="w-full flex  flex-col mt-8 border-b pb-3">

        <button className="mb-5 font-medium flex gap-2 mx-8" onClick={() => routerLocation.key !== 'default'?navigate(-1):navigate('/')}>
          <span><ArrowLeft /></span>
          {routerLocation.key !== 'default'?"Voltar":"Ver todos os animais disponíveis"}
        </button>
        <div className="w-full h-[100px] relative">
          <div className="border relative h-full aspect-square postion mx-8 rounded-lg z-50 bg-white ">
            <img alt={`Foto de perfil do usuário ${user?.display_name}`} className="relative  h-full aspect-square postion rounded-lg b bg-slate-100  object-contain z-50 bg-white " src={user?.image? user.image:Logo}></img>
          </div>
          <div className="w-full absolute top-1/2 left-0 z-0 border-b"></div>
        </div>
        <div className="mx-8 mt-5">
          <h2 className="text-2xl font-medium">{user?.display_name}</h2>
          <div className="flex gap-3">
            <span className="text-sm"><span className=" font-medium">{user?.in_adoption}</span> animais cadastrados</span>
            <span  className="text-sm"><span className="font-medium">{user?.completed_adoptions || '--'}</span> animais doados</span>
          </div>
          {/* <span className={`${ !isExpanded ? 'line-clamp-4' : 'line-clamp-none' }`} ref={contentRef}>{user?.description}</span> */}
          {user?.description &&
          <div className="mt-5">
            <div className={`${ !isExpanded ? 'line-clamp-4' : 'line-clamp-none' }`} ref={contentRef}>{user?.description}</div>
            { isClamped? <button className=" underline mt-3" onClick={() => setExpanded(true)}>Ver mais</button>: isExpanded?<button className=" underline mt-3" onClick={() => setExpanded(false)}>Ver menos</button>:''}
          </div>
          }
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