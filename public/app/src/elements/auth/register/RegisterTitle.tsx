import { useContext } from "react"
import { RegisterContext } from "./RegisterRoot"

export interface RegisterTitleProps {
  title: string,
  page: number
}
export function RegisterTitle  (props: RegisterTitleProps)   {
  const {page,setPage} = useContext(RegisterContext)

  return(
  <>
    {page === props.page? 
    <h1 className="text-2xl font-semibold mb-5  text-start " >{props.title}</h1>
    :""}
  </>)
}