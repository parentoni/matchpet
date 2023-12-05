import { Info, X } from "lucide-react"
import { PageLayout } from "../../PageLayout"
import { Register } from "../../elements/auth/register"
import { TextInput } from "../../elements/partner/input/TextInput"
import { Ref, useContext, useEffect, useState } from "react"
import { Form, checkFormErrors } from "../../elements/auth/register/Form"
import { ImageInput } from "./PartnerEditAnimal"
import { AuthContext } from "../../utils/context/AuthContext"
import { User } from "../../utils/domain/User"
import { Animal } from "../../utils/domain/Animal"
import { left } from "@popperjs/core"
import { useNavigate } from "react-router-dom"

export const PartnerConfig = () => {

  const [loading, setLoading] = useState(false)
  const {user, getToken, reloadUser} = useContext(AuthContext)

  const navigate = useNavigate()
  const onPersonalDataSubit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    let error = checkFormErrors(form, ['display_name', "phone",'description'])
    setForm(structuredClone(form))

    if (location?.length !== 2 && !location) {
      setLocationErrorMessage("Por favor, insira alguma localização")
      error++
    } else {
      setLocationErrorMessage(undefined)
    }
    if (error === 0) {

      let imageUpload:string
      if (image?.type === 'File') {
        const response = await Animal.uploadAnimalImage(image.data, getToken())
        if (response.isLeft()) {
          return alert("Erro salvando imagem, contate parentoni.arthur@gmail.com")
        } else {
          imageUpload = response.value
        }
      } else if (image?.type === 'url') {
        imageUpload = image.data
      } else {
        imageUpload = ''
      }

      const response = await User.editUser({
        display_name: form['display_name'].variable,
        phone: form['phone'].variable,
        description: form['description'].variable,
        location: location,
        image: imageUpload
      }, getToken())

      if (response.isLeft()) {
        return alert("Erro salvando usuário, contate parentoni.arthur@gmail.com")
      } else {
        alert("Mudanças salvas com sucesso.")
        await reloadUser()
        setLoading(false)

        navigate('/partner')
      }
    } else {
      alert("Algum erro aconteceu, verifique os dados apresentados.")
    }

    setLoading(false)

  }

  const [form, setForm] = useState<Form>(
    {
      'display_name': {
        variable: user?.display_name,
        regExp: /.+/gm,
        errorMessage: 'Por favor, digite o nome de exposição.'
      },

      "phone": {
        variable: user?.phone_number,
        regExp:  /^(\([1-9]{2}\)\s?9[6-9][0-9]{3}-?[0-9]{4}|[1-9]{2}9[6-9][0-9]{7})$/g,
        errorMessage: "Por favor, digite um número de whatsapp válido."
      },

      "description": {
        variable: user?.description,
        regExp: /.+/gm,
        errorMessage: "Por favor, digite uma descrição válida."
      }
    }
    )
    
  const [image, setImage] = useState<ImageInput | undefined>()
  const [location, setLocation] = useState<[number,number]>()
  const [loacationErrorMessage, setLocationErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    if (user) {
      form['display_name'].variable = user.display_name
      form['phone'].variable = user.phone_number
      form['description'].variable = user?.description || ''

      setForm(structuredClone(form))
      setLocation(user.location.coordinates) 
      setImage(user.image?{type: 'url', data: user.image}:undefined)
    }
  }, [user])

  return (
            <Register.Root page={0} setPage={() => {}} pages={1} form={form} setForm={setForm} onSubmit={onPersonalDataSubit} loading={loading}>
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-4xl px-10 pb-10 lg:p-0">
        <h1 className="text-xl font-semibold pb-5 border-b ">Configurações</h1>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10 py-5 border-b">
          <div className="flex-1">
            <h2 className="text-lg font-medium">Informações pessoais</h2>
          </div>
          <div className="flex-1">
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
                  type="tel"
                  title="Número Whatsapp"
                  placeholder="(31) 12345-6789"
                  formName="phone"
                />

                <Register.TextArea 
                  type="text"
                  title="Descrição"
                  placeholder="O meu projeto surgiu com o intuito...."
                  formName="description"
                />    

                <UserImageInput image={image} setImage={setImage}/>
              </Register.Step>
          </div>
        </div>
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10 py-5 border-b">
            <div className="flex-1">
              <h2 className="text-lg font-medium">Localização</h2>
            </div>
            <div className="flex-1">
              <Register.Location title="Localização" location={location} setLocation={setLocation} errorMessage={loacationErrorMessage}/>
            </div>
          </div>

          <div className="grid-cols-2 flex items-center justify-center">
            <Register.Button />
          </div>
          </div>
        </div>
      </Register.Root>
    )
}

export interface ImageInputProps {
  image: ImageInput | undefined,
  setImage: (x: ImageInput | undefined) => void
}
export const UserImageInput = (props: ImageInputProps) => {

  const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      props.setImage({type: 'File', data: e.target.files[0]})
    }
  }

  const deleteImage = () => {
    props.setImage(undefined)
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center text-base">
        <span className="font-medium">Imagem</span>
      </div>

      <div className="w-full relative aspect-square border rounded-md border-neutral-300 items-center justify-center flex">
        {props.image?
        <>
          <button  type="button" className="absolute w-12 h-12 -top-6 -right-6 z-50 border rounded-md bg-primary flex  items-center justify-center" onClick={deleteImage}>
            <X color="#fff"/>
          </button>
          <img alt="Imagem do usuário" className="rounded-md w-full h-full object-contain bg-neutral-100" src={props.image.type === 'url'?props.image.data: URL.createObjectURL(props.image.data)}></img>
        </> 
        :
        <>
          <label htmlFor="user-image-input">Clique aqui para adicionar a sua imagem</label>
          <input id="user-image-input" type="file" accept="image/*" className="hidden" onChange={onImageInput}></input>
        </>
        }
      </div>

    </div>
  )
}