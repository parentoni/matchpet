import { PropsWithChildren, createContext } from "react"
import { Form } from "./Form"

export const RegisterContext = createContext<{page: number, setPage: (x:number) => void, pages: number, form: Form, setForm: (x:Form) => void}>({page: 0, setPage: () => {}, pages: 0, form: {}, setForm: () => {}})

export interface RegisterRootProps {
  page: number,
  setPage: (x: number) => void,
  pages: number,
  form: Form,
  setForm: (x: Form) => void,
  onSubmit:(e: React.FormEvent<HTMLFormElement>) => void
}

export function RegisterRoot (props: PropsWithChildren<RegisterRootProps>) {

  return (

  <RegisterContext.Provider value={{page: props.page, setPage: props.setPage, pages: props.pages, form: props.form, setForm: props.setForm}}>
    <form className="flex flex-col" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  </RegisterContext.Provider>)
}
