import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AuthContext } from "../../utils/context/AuthContext"

/**
 * Captive page for no login authentication, using token
 */
export const Captive = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const {setToken, reloadUser, loading} = useContext(AuthContext)
  const [hasSetToken, setHasSetToken] = useState<boolean>(false)

  const navigate = useNavigate()
  //Check for token param
  useEffect(() => {
    const token = searchParams.get('token')
    if (token !== null) {
      setToken(token)
      setHasSetToken(true)
    }
  }, [searchParams])

  //Check if token has been set, and if should redirect to partner
  useEffect(() => {
    if (hasSetToken && !loading) {
      navigate('/partner')
    }
  }, [hasSetToken, loading])

  return(
  <h1>Carregando ...</h1>
  )
}
