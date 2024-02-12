import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react"
import { PageLayout } from "../../PageLayout"
import { useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, Info, MoveLeft } from "lucide-react";
import reducedLogo from '../../assets/logo-reduced.svg'
import logo from '../../assets/logo.svg'

import { Register } from "../../elements/auth/register";
import { Form} from "../../elements/auth/register/Form";
import { firstPageSubmit } from "../../elements/auth/register/functions/firstPageSubmit";
import { secondPageSubmit } from "../../elements/auth/register/functions/secondPageSubmit";
import { User } from "../../utils/domain/User";

export function RegisterPage () {

  const navigate = useNavigate()
  const routerLocation = useLocation()

  const [page, setPage] = useState<number>(0)

  const [showFirstPassword, setShowFirstPassword] = useState<boolean>(false)
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const usernameRef = useRef<HTMLInputElement>(null)

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
      }, 
      "phone": {
        variable: '',
        regExp:  /^(\([1-9]{2}\)\s?9[6-9][0-9]{3}-?[0-9]{4}|[1-9]{2}9[6-9][0-9]{7})$/g,
        errorMessage: "Por favor, digite um número de whatsapp válido."
      }
    }
    )

  const [location, setLocation] = useState<[number,number]>()
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>()

  const [errorMessage, setErrorMessage] = useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (page === 0) {
      await firstPageSubmit(form, setForm, setPage)
    } else if (page === 1) {
      secondPageSubmit(form,setForm, location, setLocationErrorMessage, setPage)
    } else {
      const response = await User.signInUser({
        display_name: form['display_name'].variable,
        username: form['username'].variable,
        email: form['email'].variable,
        password: form['password'].variable,
        phone:  form['phone'].variable,
        location: location || [0,0]
      })

      if (response.isLeft()) {
        setErrorMessage(response.value)
      } else {
        navigate('/auth/register/success?email=' + form['email'].variable)
      }

    }
    setLoading(false)
  }


  return (
    <div className="w-screen h-screen">
      
    <PageLayout>
      <div className="flex  justify-center ">
        <div className=" max-w-lg w-full bg-white lg:mt-24">

        <div className="flex justify-between mb-3">
          <button className="" onClick={() => page === 0?(routerLocation.key !== 'default'?navigate(-1): navigate('/')) : setPage(page - 1)}>
            <MoveLeft />
          </button>
          <button onClick={() => navigate('/')} className="lg:hidden">
            <img className=" h-6" alt="MatchPet" src={reducedLogo}></img>
          </button>
          <button onClick={() => navigate('/')} className="hidden lg:block">
            <img className=" h-6" alt="MatchPet" src={logo}></img>
          </button>
        </div>

        <Register.Root page={page} setPage={setPage} pages={3} form={form} setForm={setForm} onSubmit={onSubmit} loading={loading}>

          <Register.Title page={0} title="Crie sua conta"/> 
          <Register.Title page={1} title="Detalhes de contato"/>
          <Register.Title page={2} title="Revise sua conta"/>

          <Register.Step page={0}>
            <Register.TextInput
              formName="display_name"
              type={'text'}
              title="Nome de exibição"
              placeholder="ONG matchpet" 
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
              placeholder="matchpet"
              tooltip={
                <Register.Tooltip 
                  onClick={() => alert('Nome que será utilizado para identificação e em links. Pode apenas conter os caracters -, _, A até Z e 0 até 9')} 
                  interior={<Info size={24} color="#fff"/>}
                />
              }

              innerRef={usernameRef}
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
              title="Confirme a senha"
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
            <Register.TextInput 
              type="tel"
              title="Número Whatsapp"
              placeholder="(31) 12345-6789"
              formName="phone"
            />
            <Register.Location title="Localização" location={location} setLocation={setLocation} errorMessage={locationErrorMessage}/>
          </Register.Step>

          <Register.Step page={2}>
            <h2 className="text-xl font-medium mb-3 text-start">Geral</h2>
            <div className="flex flex-col gap-2">
              <span className="">Nome de exibição: <b>{form['display_name'].variable}</b></span>
              <span className="">Nome de usuário: <b>{form['username'].variable}</b></span>
              <span className="">Email: <b>{form['email'].variable}</b></span>
              <span className="">Telefone: <b>{form['phone'].variable}</b></span>
            </div>
            
          </Register.Step>

          <Register.Button />
          {errorMessage && <span className="text-error mt-2">{errorMessage}</span>}
        </Register.Root>
        </div>
      </div>
    </PageLayout>
    </div>
  )
}
