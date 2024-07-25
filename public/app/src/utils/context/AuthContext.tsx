import { createContext, useEffect, useState } from "react";
import { Either, left, right } from "../shared/Result";
import { Api } from "../services/Api";
import { IUserPersistent } from "../services/dtos/UserDTO";
import { NavigateFunction} from "react-router-dom";


type LoginFunction = (email:string, password:string) => Promise<Either<Response, string>>
async function __login (email:string, password:string): Promise<Either<Response, string>> {
  const response = await Api.post('/auth/login', JSON.stringify({
    credential: email,
    password: password
  }))

  if (response.isLeft()) {
    return left(response.value)
  }

  return right((response.value as {token:string}).token)
}


export interface AuthContextProps {
  user: IUserPersistent | undefined,
  login: LoginFunction,
  getToken: () => string,
  loading: boolean,
  setToken: (x:string) => void,
  reloadUser: () => Promise<void>,
  protectRoute: (navigate: NavigateFunction) => void
}
export const AuthContext = createContext<AuthContextProps>({
  user: undefined, login: (() => {}) as unknown as LoginFunction,
  getToken: () => '', 
  loading:true, 
  setToken: () => {}, 
  reloadUser: async () => {},
  protectRoute: () => {},
  })

export const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IUserPersistent | undefined>()
  const [token,setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    const token = window.localStorage.getItem('matchpet_token')
    if (token) {
      setToken(token)
    }
  }, [])


  useEffect(() => {
    if (token) {
      getInfo(token).then((response) => {
        localStorage.setItem('matchpet_token', token)
        if (response.isRight()) {
          setUser(response.value)
        }
      })
    }
  }, [token])

  async function getInfo (token:string):Promise<Either<Response, IUserPersistent>> {
    const response = await Api.get('/user/myself', token)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as IUserPersistent)
  }

  async function login (email:string, password:string): Promise<Either<Response, string>> {
    setLoading(true)
    const response = await __login(email, password)
    if (response.isLeft()) {
      setLoading(false)
      return left(response.value)
    }

    const mySelfResponse = await getInfo(response.value)
    if (mySelfResponse.isLeft()) {
      setLoading(false)
      return left(mySelfResponse.value)
    }

    localStorage.setItem('matchpet_token', response.value)
    setUser(mySelfResponse.value)
    setLoading(false)
    return right('success')
  }

  function getToken(){
    return window.localStorage.getItem('matchpet_token') || ''
  }

  async function reloadUser () {
    const token = getToken()
    const info = await getInfo(token)
    if (info.isRight()) {
      setUser(info.value)
    } else {
      setUser(undefined)
    
    }
  }

  async function protectRoute (navigate: NavigateFunction) {
    if (!getToken()) {
      navigate("/auth/login")
    }
  }

  return (
    <AuthContext.Provider value={{user, login: login, getToken:getToken, loading, setToken, reloadUser, protectRoute}}>
      {children}
    </AuthContext.Provider>
  )
}
