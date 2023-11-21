import { PropsWithChildren, useContext, useState } from "react"
import { PageLayout } from "../../PageLayout"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Info, MoveLeft } from "lucide-react";
import reducedLogo from '../../assets/logo-reduced.svg'
import logo from '../../assets/logo.svg'

import { Register } from "../../elements/auth/register";
import { Form, checkFormErrors } from "../../elements/auth/register/Form";
export function RegisterPage () {

  const navigate = useNavigate()

  const [page, setPage] = useState<number>(0)

  const [showFirstPassword, setShowFirstPassword] = useState<boolean>(false)
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false)
  
  const [form, setForm] = useState<Form>(
    {
      'display_name': {
        variable: '',
        regExp: /.+/gm,
        errorMessage: 'Por favor, digite o nome de exposição.'
      },

      "username": {
        variable: '',
        regExp: /^[a-zA-Z0-9_.-]*\b\w{1,100}\b$/g,
        errorMessage: 'Por favor, digite um nome de usuário válido.'
      },

      "email" : {
        variable: '',
        regExp: /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm,
        errorMessage: "Por favor, digite um email válido."
      },
      "password": {
        variable: '',
        regExp: /.{6,}/g,
        errorMessage: "Por favor, digite uma senha com mais de 6 caracteres."
      },
      "confirm_password": {
        variable:'',
        regExp: /.{6,}/g,
        errorMessage: "Por favor, digite uma senha igual à primeira."
      }
    }
    )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (page === 0) {
      firstPageSubmit()
    }
  }

  const firstPageSubmit = () => {
    const error = checkFormErrors(form)
    if (error) {
      setForm(structuredClone(form))
    }

    if (form['password'].variable !== form['confirm_password'].variable && !form['password'].hasError)   {
      form['confirm_password'].hasError = true
      setForm(structuredClone(form))
    } else {
      form['confirm_password'].hasError = false
      setForm(structuredClone(form))
    }
  }
  return (
    <div className="w-screen h-screen0">
      
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

        <Register.Root page={page} setPage={setPage} pages={3} form={form} setForm={setForm} onSubmit={onSubmit}>

          <Register.Title page={0} title="Crie sua conta"/> 
          <Register.Title page={1} title="Detalhes de contato"/>
          <Register.Title page={2} title="Revise sua conta"/>

          <Register.Step page={0}>
            <Register.TextInput
              formName="display_name"
              type={'text'}
              title="Nome de exibição"
              placeholder="ONG Parentoni" 
              tooltip={
                <Register.Tooltip 
                  onClick={() => alert('Nome que será utilizado para exibir a sua organização em nosso site.')} 
                  interior={<Info size={24} color="#fff"/>}
                />
              }
            />
            <Register.TextInput 
              formName="username"
              type={'text'}
              inputMode={'text'}
              title="Nome de usuário"
              placeholder="parentoni"
              tooltip={
                <Register.Tooltip 
                  onClick={() => alert('Nome que será utilizado para identificação e em links. Pode apenas conter os caracters -, _, A até Z e 0 até 9')} 
                  interior={<Info size={24} color="#fff"/>}
                />
              }
              />
            <Register.TextInput type={'email'} title="Email" placeholder="nome@provedor.com" formName="email"/>
            <Register.TextInput 
              formName="password"
              type={showFirstPassword ?"text":"password"}
              inputMode={'text'}
              title="Senha"
              placeholder="•••••••••"
              tooltip={
                <Register.Tooltip 
                  onClick={() => setShowFirstPassword(!showFirstPassword)} 
                  interior={showFirstPassword?<EyeOff size={24} color="#fff"/>:<Eye size={24} color="#fff"/>}
                />
              }
              />

            <Register.TextInput 
              formName="confirm_password"
              type={showSecondPassword ?"text":"password"}
              inputMode={'text'}
              title="Senha"
              placeholder="•••••••••"
              tooltip={
                <Register.Tooltip 
                  onClick={() => setShowSecondPassword(!showSecondPassword)} 
                  interior={showSecondPassword?<EyeOff size={24} color="#fff"/>:<Eye size={24} color="#fff"/>}
                />
              }
              />

          </Register.Step>

          <Register.Step page={1}>
          </Register.Step>

          <Register.Step page={2}>
            <>revisar</>
          </Register.Step>

          <Register.Button />
        </Register.Root>
        </div>
      </div>
    </PageLayout>
    </div>
  )
}










