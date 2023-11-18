import { PropsWithChildren, useContext, useState } from "react"
import { PageLayout } from "../../PageLayout"
import { useNavigate } from "react-router-dom"
import { MoveLeft } from "lucide-react";
import reducedLogo from '../../assets/logo-reduced.svg'
import { Register } from "../../elements/auth/register";
export function RegisterPage () {

  const navigate = useNavigate()

  const [page, setPage] = useState<number>(0)
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

      <Register.Root page={page} setPage={setPage} pages={3}>

        <Register.Title page={0} title="Crie sua conta"/> 
        <Register.Title page={1} title="Detalhes de contato"/>
        <Register.Title page={2} title="Revise sua conta"/>

        <Register.Step page={0}>
          <Register.TextInput type={'text'} title="Nome de exibição" placeholder="ONG Parentoni" tooltip="Nome que será utilizado para exibir a sua organização em nosso site."/>
          <Register.TextInput type={'text'} inputMode={'text'} title="Nome de usuário" placeholder="parentoni" tooltip="Nome que será utilizado para identificação e em links. Pode apenas conter os caracters -, _, A até Z e 0 até 9"/>
          <Register.TextInput type={'email'} title="Email" placeholder="nome@provedor.com" />

        </Register.Step>

        <Register.Step page={1}>
        </Register.Step>

        <Register.Step page={2}>
          <>revisar</>
        </Register.Step>

        <Register.Button />
      </Register.Root>
    </PageLayout>
  )
}










