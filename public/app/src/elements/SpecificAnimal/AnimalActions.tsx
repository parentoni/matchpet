import { Share2, MoveLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
export function AnimalAction ({AnimalId}: {AnimalId:string}) {
  const navigate = useNavigate()
  const location = useLocation()
  return(
    <div className="absolute w-full top-0 left-0 z-50 p-5 flex justify-between">
      <button className="w-12 h-12 p-1 rounded-full bg-white flex justify-center items-center" onClick={() => {
        if (location.key !== 'default') {
          navigate(-1)
        } else {
          navigate('/animals')
        }
        }}>
        <MoveLeft />
      </button>
      <button className="w-12 h-12 p-1 rounded-full bg-white flex justify-center items-center" onClick={() => navigator.clipboard.writeText(`https://www.matchpet.org/animals/${AnimalId}`).then(() => alert("Link copiado."), () => alert(`O link do animal é: https://www.matchpet.org/animals/${AnimalId}`))}>
        <Share2 />
      </button>
    </div>
  )
}
