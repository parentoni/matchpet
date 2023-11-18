import { PropsWithChildren, createContext } from "react"

export const RegisterContext = createContext<{page: number, setPage: (x:number) => void, pages: number}>({page: 0, setPage: () => {}, pages: 0})

export interface RegisterRootProps {
  page: number,
  setPage: (x: number) => void,
  pages: number
}

export function RegisterRoot (props: PropsWithChildren<RegisterRootProps>) {

  return (

  <RegisterContext.Provider value={{page: props.page, setPage: props.setPage, pages: props.pages}}>
    <div className="flex flex-col">
      {props.children}
    </div>
  </RegisterContext.Provider>)
}
