import { useNavigate, useSearchParams } from "react-router-dom"
import { PageLayout } from "../../PageLayout"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { User } from "../../utils/domain/User"

export const ResetPassword = () => {

  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()

  const [firstPassword, setFirstPassword] = useState<string>('')
  const [secondPassword, setSecondPassword] = useState<string>('')


  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  const changePassword = async () => {
    setLoading(true)
    if (!loading) {
      if (firstPassword && secondPassword) {
        if (firstPassword === secondPassword) {
          if (searchParams.get('token') !== null) {
            const response = await User.resetPassword(searchParams.get('token') as string, firstPassword)
            if (response.isLeft()) {
              setErrorMessage('Algo deu errado. Por favor, contate parentoni.arthur@gmail.com.')
            } else {
              navigate('/auth/new-password/success')
            }
          } else {
            setErrorMessage('Algo deu errado. Por favor, contate parentoni.arthur@gmail.com.')
          }
        } else {
          setErrorMessage('As senhas não conferem.')
        }
      } else {
        setErrorMessage("Por favor, digite as duas senhas.")
      }
      setLoading(false)
    }
  }
  return (
    <PageLayout>
      <div className="flex  justify-center ">
        <div className=" max-w-lg w-full bg-white lg:mt-24 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Redefina sua senha</h1>
          <PasswordInput password={firstPassword} setPassword={setFirstPassword} error={!!errorMessage} title="Nova senha"/>
          <PasswordInput password={secondPassword} setPassword={setSecondPassword} error={!!errorMessage} title="Confirme a sua senha"/>
          <button className="w-full h-12 bg-primary rounded flex justify-center items-center text-white text-lg" onClick={changePassword}>
            {loading?<span className=" loading loading-spinner loading-sm"></span>:<span>Entrar</span>}
          </button>
          {errorMessage && <span className="text-sm text-error">{errorMessage}</span>}

        </div>

      </div>
    </PageLayout>
  )
}

export function PasswordInput ({password, setPassword, error, title}: {password:string, setPassword: (x: string) => void, error: boolean, title:string}) {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  return(
    <div className="flex flex-col gap-1">
    <div className="flex gap-3  items-center justify-between text-base">
      <label className="font-medium">{title}</label>
    </div>
    <div className="flex w-full h-12 relative">
      <input type={show?'text': 'password'} className={`w-full h-12 autofill:bg-primary autofill:text-white  pl-6 py-4 border  focus:border-neutral-600 rounded-md transition ring-transparent relative focus:outline-none focus:ring-primary/20 ring-4 outline-2  font-normal text-lg ${error?"border-error  bg-error/5":"border-neutral-300"}`} placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type="button" className={'h-10 absolute top-1 right-1 aspect-square flex rounded-md bg-primary items-center justify-center'} onClick={() => setShow(!show)}>
        {show?<EyeOff color="#fff"/>:<Eye  color="#fff"/>}
      </button>

    </div>
  </div>
    )
}