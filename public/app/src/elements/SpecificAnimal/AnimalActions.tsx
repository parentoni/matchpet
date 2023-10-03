import { Share2, MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
export function AnimalAction ({AnimalId}: {AnimalId:string}) {
  const navigate = useNavigate()
  return(
    <div className="absolute w-full top-0 left-0 z-50 p-5 flex justify-between">
      <button className="w-12 h-12 p-1 rounded-full bg-white flex justify-center items-center" onClick={() => navigate('/')}>
        <MoveLeft />
      </button>
      <button className="w-12 h-12 p-1 rounded-full bg-white flex justify-center items-center" onClick={() => {
        alert("O URL foi copiado!")
      }}>
        <Share2 />
      </button>
    </div>
  )
}
