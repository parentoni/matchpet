import { useNavigate } from "react-router-dom";
import { PageLayout } from "../elements/PageLayout";
import { MoveLeft } from "lucide-react";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import reducedLogo from '../assets/logo-reduced.svg'
import { AuthContext } from "../utils/context/AuthContext";
export function Login () {
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginWrapper = async () => {
    const response  = await login(email, password)
    if (response.isLeft()) {
      return alert("Usuário e/ou senha incorretos")
    }

    navigate('/manage')

  }
  return (
    <PageLayout>
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
          <EmailInput email={email} setEmail={setEmail}/>
          <PasswordInput password={password} setPassword={setPassword}/>
        </div>
        <button className="w-full h-12 bg-black flex justify-center items-center text-white text-lg" onClick={loginWrapper}>
          Entrar
        </button>
        <p className="text-sm">Ainda não tem uma conta? Entre em contato com <span className="  font-semibold">parentoni.arthur@gmail.com</span> e crie a sua em até 2 dias úteis.</p>
      </div>
    </PageLayout>
  )
}

export function EmailInput ({email, setEmail}: {email:string, setEmail: (x: string) => void}) {
  return(
    <input className="w-full brute-border h-12 p-2 focus:outline-0 outline-black rounded-none font-normal placeholder-black text-lg" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
  )
}

export function PasswordInput ({password, setPassword}: {password:string, setPassword: (x: string) => void}) {
  const [show, setShow] = useState(false)
  return(
    <div className="w-full h-12 flex">
      <input type={show? "text": "password"} className="flex-1 brute-border border-r-0 p-2 focus:outline-0 outline-black rounded-none font-normal placeholder-black text-lg" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}></input>
      <div className="flex items-center justify-center h-full aspect-square brute-border" onClick={() => setShow(!show)}>
        {show? <EyeOff />: <Eye />}
      </div>
    </div>
    )
}
