import { MoveLeft } from "lucide-react"
import { PageLayout } from "../../PageLayout"
import { useNavigate } from "react-router-dom"

import reducedLogo from '../../assets/logo-reduced.svg'
import logo from '../../assets/logo.svg'
import { useState } from "react"
import { User } from "../../utils/domain/User"

export const ForgotPassword = () => {


  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const forgotPassword = async () => {
    setLoading(true)
    if (!loading) {
      if (email) {
        const response = await User.sendPasswordRedefinitionEmail(email)
        if (response.isLeft()) {
          setErrorMessage("Algo deu errado. Verifique se o email ou nome de usuário é válido.")
        } else {
          setErrorMessage(undefined)
          setLoading(false)
          navigate('/auth/password/success')
        }
      } else {
        setErrorMessage("Digite um email ou nome de usuário válido.")
      }
      setLoading(false)
    }
  }

  return (
  <PageLayout>
    <div className="flex  justify-center ">
      <div className=" max-w-lg w-full bg-white lg:mt-24">
        <div className="flex justify-between mb-3">
          <button className="" onClick={() => navigate(-1)}>
            <MoveLeft />
          </button>
          <button onClick={() => navigate('/')} className="lg:hidden">
            <img className=" h-6" alt="MatchPet" src={reducedLogo}></img>
          </button>
          <button onClick={() => navigate('/')} className="hidden lg:block">
            <img className=" h-6" alt="MatchPet" src={logo}></img>
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Redefina a sua senha.</h1>
          
          <EmailInput email={email} setEmail={setEmail} error={!!errorMessage}/>

          <button className="w-full h-12 bg-primary rounded flex justify-center items-center text-white text-lg" onClick={forgotPassword}>
            {loading?<span className=" loading loading-spinner loading-sm"></span>:<span>Redefinir</span>}
          </button>
          {errorMessage && <span className="text-sm text-error">{errorMessage}</span>}
        </div>
      </div>
    </div>
  </PageLayout>)
}


export function EmailInput ({email, setEmail, error}: {email:string, setEmail: (x: string) => void, error:boolean}) {
  return(
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center text-base">
        <label className="font-medium">Email ou nome de usuário</label>
      </div>
      <input className={`w-full h-12 autofill:bg-primary autofill:text-white  pl-6 py-4 border  focus:border-neutral-600 rounded-md transition ring-transparent relative focus:outline-none focus:ring-primary/20 ring-4 outline-2  font-normal text-lg ${error?"border-error  bg-error/5":"border-neutral-300"}`} placeholder="nome@provedor.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
    </div>
  )
}