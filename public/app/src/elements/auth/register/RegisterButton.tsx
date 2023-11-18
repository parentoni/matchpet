import { useContext } from "react"
import { RegisterContext } from "./RegisterRoot"

export function RegisterButton () {

  const {page, setPage, pages} = useContext(RegisterContext)

  const nextPage = () => {
    if (page + 1 < pages) {
      setPage(page+1)
    }
  }
  return (
    <button className="w-full h-12 bg-black flex justify-center items-center text-white text-lg mt-5" onClick={nextPage}>
      Próxima página ({page + 1}/{pages})
    </button>
  )
}