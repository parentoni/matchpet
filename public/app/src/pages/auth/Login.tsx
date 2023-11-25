import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../PageLayout";
import { MoveLeft } from "lucide-react";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import reducedLogo from '../../assets/logo-reduced.svg'
import { AuthContext } from "../../utils/context/AuthContext";
export function Login () {
  const navigate = useNavigate()
  const {login, loading} = useContext(AuthContext)
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>()
  const loginWrapper = async () => {
    if (!loading) {
      if (email && password) {
        const response  = await login(email, password)
        if (response.isLeft()) {
          setErrorMessage("Credenciais incorretas.")
        } else {
          setErrorMessage(undefined)
          navigate('/partner')
        }
      } else {
          setErrorMessage("Credenciais incorretas.")
      }

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
            <button onClick={() => navigate('/')}>
              <img className=" h-6" alt="MatchPet" src={reducedLogo}></img>
            </button>
          </div>
      
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">Entre em sua conta</h1>
        <div className="flex flex-col gap-3">
          <EmailInput email={email} setEmail={setEmail} error={!!errorMessage}/>
          <PasswordInput password={password} setPassword={setPassword} error={!!errorMessage}/>
        </div>
        <button className="w-full h-12 bg-primary rounded flex justify-center items-center text-white text-lg" onClick={loginWrapper}>
          {loading?<span className=" loading loading-spinner loading-sm"></span>:<span>Entrar</span>}
        </button>
        {errorMessage && <span className="text-sm text-error">{errorMessage}</span>}
        <p className="text-sm">Ainda não tem uma conta? <span><button onClick={() => navigate('/auth/register')} className="underline text-primary ">Crie uma agora mesmo</button></span>.</p>
      </div>
      </div>
      </div>

    </PageLayout>
  )
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

export function PasswordInput ({password, setPassword, error}: {password:string, setPassword: (x: string) => void, error: boolean}) {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  return(
    <div className="flex flex-col gap-1">
    <div className="flex gap-3  items-center justify-between text-base">
      <label className="font-medium">Senha</label>
      <button onClick={() => navigate('/auth/password')}className="font-medium underline text-primary">Esqueci a minha senha.</button>
    </div>
    <div className="flex w-full h-12 relative">
      <input type={show?'text':'password'} className={`w-full h-12 autofill:bg-primary autofill:text-white  pl-6 py-4 border  focus:border-neutral-600 rounded-md transition ring-transparent relative focus:outline-none focus:ring-primary/20 ring-4 outline-2  font-normal text-lg ${error?"border-error  bg-error/5":"border-neutral-300"}`} placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type="button" className={'h-10 absolute top-1 right-1 aspect-square flex rounded-md bg-primary items-center justify-center'} onClick={() => setShow(!show)}>
        {show?<EyeOff color="#fff"/>:<Eye  color="#fff"/>}
      </button>

    </div>
  </div>
    )
}
