import { useContext } from "react"
import { RegisterContext } from "./RegisterRoot"

export function RegisterButton () {

  const {page, pages} = useContext(RegisterContext)
  return (
    <input type="submit" className="w-full h-12 bg-primary  cursor-pointer rounded-md flex justify-center items-center text-white text-lg mt-5" value={`Próxima página (${page + 1}/${pages})`}>
    </input>
  )
}