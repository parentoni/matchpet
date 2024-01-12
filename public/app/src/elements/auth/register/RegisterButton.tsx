import { useContext } from "react"
import { RegisterContext } from "./RegisterRoot"

export function RegisterButton () {
  const {page, pages, loading} = useContext(RegisterContext)
  return (
    <button type="submit" className="w-full h-12 bg-primary  cursor-pointer rounded-md flex justify-center items-center text-white text-lg mt-5">
      {loading? <span className=" loading loading-spinner loading-sm"></span>:page +1 !== pages?<span> Próxima página ({page + 1}/{pages})</span>: <span>Salvar</span>}
    </button>
  )
}
