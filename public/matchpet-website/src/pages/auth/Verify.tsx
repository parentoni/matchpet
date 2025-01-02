import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { User } from "../../utils/domain/User"
import { left } from "@popperjs/core"
import { AuthContext } from "../../utils/context/AuthContext"

export const Verify = () => {
  
  const [loading, setLoading] = useState(true)
  const [searchPararams, _] = useSearchParams()

  const {setToken} = useContext(AuthContext)

  useEffect(() => {
    if (searchPararams.get('token') !== null) {
      User.verifyUser(searchPararams.get('token') as string).then(res => {
        if (res.isLeft()) {
          alert("Algo deu errado. Contate parentoni.arthur@gmail.com")
        } else {
          setLoading(false)
          setToken(res.value.token)
        }
      })
    }
  },[searchPararams])

  const navigate = useNavigate()
  return (
    <>
      {loading?
      <div className="w-screen h-screen flex items-center justify-center">
          <span className=" loading loading-spinner text-primary  loading-lg"></span>
      </div>:
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
          <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">Tudo pronto.</h1>
          <p className="mt-6 text-xl text-neutral-600">Esperamos que com o <b>Matchpet</b> você consiga fazer a <span className="text-primary">diferença</span>. Muito obrigado pela confiança em criar uma conta conosco.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-5">
              
              <button className="w-60 h-10 rounded text-white bg-primary flex items-center justify-center " onClick={() => navigate('/partner/config')}>
                Adicionar imagem e descrição
              </button>
              <button className="w-60 h-10 rounded text-white bg-primary flex items-center justify-center " onClick={() => navigate('/partner?first=true')}>
                Cadastrar animais
              </button>
            </div>
        </div>

    </div>}
    </>
  )
}
