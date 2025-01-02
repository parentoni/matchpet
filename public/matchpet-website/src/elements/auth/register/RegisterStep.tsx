import { useContext } from "react"
import { RegisterContext } from "./RegisterRoot"

export interface RegisterStepProps {
  page: number,
  children: React.ReactNode
}
export function RegisterStep (props:RegisterStepProps) {
  const {page} = useContext(RegisterContext)
  return (
    <>
    {props.page === page && 
    <div className="flex flex-col gap-3">
      {props.children}
    </div>
    }
    </>
  ) 
}
