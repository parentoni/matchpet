import { createContext, useEffect, useState } from "react";
import { Either, left, right } from "../shared/Result";
import { Api } from "../services/Api";
import { IUserPersistent } from "../services/dtos/UserDTO";


type LoginFunction = (email:string, password:string) => Promise<Either<Response, string>>
async function __login (email:string, password:string): Promise<Either<Response, string>> {
  const response = await Api.post('/auth/login', JSON.stringify({
    email: email,
    password: password
  }))

  if (response.isLeft()) {
    return left(response.value)
  }

  return right((response.value as {token:string}).token)
}


export const AuthContext = createContext<{user: IUserPersistent | undefined, login: LoginFunction, token: string}>({user: undefined, login: (() => {}) as unknown as LoginFunction, token: ''})

export const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IUserPersistent | undefined>()
  const [token,setToken] = useState<string>('')

  useEffect(() => {
    const token = window.localStorage.getItem('matchpet_token')
    if (token) {
      setToken(token)
      getInfo(token).then((response) => {
        if (response.isRight()) {
          setUser(response.value)
        }
      })
    }
  }, [])

  async function getInfo (token:string):Promise<Either<Response, IUserPersistent>> {
    const response = await Api.get('/auth/myself', token)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as IUserPersistent)
  }

  async function login (email:string, password:string): Promise<Either<Response, string>> {
    const response = await __login(email, password)
    if (response.isLeft()) {
      return left(response.value)
    }

    const mySelfResponse = await getInfo(response.value)
    if (mySelfResponse.isLeft()) {
      return left(mySelfResponse.value)
    }

    localStorage.setItem('matchpet_token', response.value)
    setUser(mySelfResponse.value)
    return right('success')
  }
  return (
    <AuthContext.Provider value={{user, login: login, token:token}}>
      {children}
    </AuthContext.Provider>
  )
}