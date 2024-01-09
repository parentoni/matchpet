import { Menu} from "lucide-react"
import { TextInput } from "../../elements/partner/input/TextInput"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../utils/context/AuthContext"
import { ISignInUserProps, User } from "../../utils/domain/User"
import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "../../elements/partner/new/PartnerBase"
import { AnimalInputValue } from "../../elements/partner/new/PartnerCreateAnimalFormTypes"
import { TextArea } from "../../elements/partner/input/TextArea"
import { ImageInput, ImageInputModal } from "../../elements/partner/new/ImageInput"
import { HostedImage, IMAGE_TYPES, Image } from "../../utils/domain/Image"

export type ConfigInputErrors = {
  [x in keyof ConfigsInput]: boolean
}
export const PartnerConfig = () => {

  const {setIsOpen} = useOutletContext() as OutletContextType
  const {getToken, reloadUser} = useContext(AuthContext)

  const [
    [configsInput, setConfigsInput], 
    [image, setImage]
  ] = useGetConfigvariables()

  const [animalInputErrors, setAnimalInputErrors] = useState<ConfigInputErrors>({description: false, display_name: false});
  const [imageError, setImageError] = useState<boolean>(false)
  const [imageInputModalOpenId, setImageInputModalOpenId] = useState<number | undefined>(undefined);
  const [imageInputModalOpen, setImageInputModalOpen] = useState(false);

  const [loading,setLoading] = useState<boolean>(false)
  
  function changeConfigInput<T extends keyof ConfigsInput>(key: T, value: ConfigsInput[T]['value']) {
    configsInput[key].value = value;
    setConfigsInput(structuredClone(configsInput));
  }
  
  function changeConfigInputErrors(key: keyof ConfigInputErrors, value: boolean) {
    animalInputErrors[key as keyof ConfigInputErrors] = value;
    setAnimalInputErrors(structuredClone(animalInputErrors));
  
  }

  const checkForErrors = ():number => {
    let err = 0

    for (const key of Object.keys(configsInput)) {
      const value = configsInput[key as keyof ConfigsInput]
      if (!value.value && value.obrigatory) {
        err++
        changeConfigInputErrors(key as keyof ConfigInputErrors, true)
      } else {
        changeConfigInputErrors(key as keyof ConfigInputErrors, false)
      }
    }


    if (!image) {
      err++
      setImageError(true)
    } else {
      setImageError(false)

    }
    return err
  } 
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = checkForErrors()
    if (err === 0 && !loading) {
      setLoading(true) 

      let persistentImage: string| undefined = undefined
      if (image) {
        if (image.type === IMAGE_TYPES.FILE) {
          const response = await Image.upload(image.data as File, getToken())
          if (response.isRight()) {
            persistentImage = response.value
          }
        } else {
          persistentImage = image.data as string
        }
      }

      const uploadDTO: Partial<ISignInUserProps> = {
        display_name: configsInput.display_name.value,
      }

      if (persistentImage) {
        uploadDTO.image = persistentImage
      }

      if (configsInput.description.value) {
        uploadDTO.description = configsInput.description.value
      }

      const response = await User.editUser(uploadDTO, getToken())
      if (response.isLeft()) {
        alert("Algo deu errado salvando os dados, contate parentoni.arthur@gmail.com ou +55 31 9 9904-9188.")
      } else {
        await reloadUser()
        alert("Dados do usuário alterados.")

      }

      setLoading(false)
    } 
   
  }

  return (
    <>
      <div className="w-full flex flex-col h-screen overflow-y-auto relative">
        <header className="w-full sticky bg-white h-12 border-b flex items-center top-0 px-8  z-10" >
          <button onClick={() => setIsOpen(true)} className="flex md:hidden h-12 gap-4 items-center ">
            <Menu />
          </button>
        </header>

        <div className="w-full p-8 border-b">
          <h1 className=" font-medium text-xl">Configurações</h1>
          <p>Customize dados de sua organização</p>
        </div>

        <section className="flex p-8 flex-1 flex-col w-[min(100%,37rem)]">
          <h2 className=" h-8 flex items-center text-xl font-medium">Informações do projeto</h2>
          <div className="w-full border-b my-4"></div>

          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <TextInput 
              state={configsInput.display_name.value}
              onChange={e => changeConfigInput('display_name', e.target.value)}
              title={"Nome de exibição"}
              placeholder={"Projeto Matchpet"}
              obrigatory={configsInput.display_name.obrigatory}
              errorMessage={animalInputErrors.display_name ? "O nome de exibição é obrigatório" : undefined}
            />

            <TextArea
              state={configsInput.description.value}
              onChange={e => changeConfigInput('description', e.target.value)}
              title={"Descrição"}
              placeholder={"O projeto MatchPet nasceu em 2023 e tem como intuito..."}
              obrigatory={configsInput.description.obrigatory}
              errorMessage={animalInputErrors.description ? "Algo deu errado salvando a descrição." : undefined}

            />

            <ImageInput 
              title={"Foto de perfil"}
              image={image}
              id={0} 
              setImageInputModalOpenId={setImageInputModalOpenId} 
              setIsOpen={setImageInputModalOpen}
              obrigatory
              errorMessage={imageError ? "A imagem é obrigatória" : undefined}
              />

            <button className="h-8 w-full bg-primary text-white text-xs rounded mt-8 items-center flex justify-center" type="submit">{loading?<span className="loading loading-spinner"></span>:<p>Salvar alterações</p>}</button>
          </form>
        </section>
      </div>
      <ImageInputModal
      imageInputModalIsOpenId={imageInputModalOpenId}
      setImageInputModalOpenId={setImageInputModalOpenId}
      isOpen={imageInputModalOpen}
      setIsOpen={setImageInputModalOpen}
      imagesArray={image? [image]: []}
      setImagesArray={(x: Image[]) => {
       setImage(x[0] || undefined)
      } } />
    </>
  )
}

export interface ConfigsInput {
  display_name: AnimalInputValue<string>,
  description: AnimalInputValue<string>,
}
export const  useGetConfigvariables = (): [[ConfigsInput, (x: ConfigsInput) => void], [Image | undefined, (x: Image | undefined) => void]] => {

  const {user} = useContext(AuthContext)


  const [configsInput, setConfigsInput] = useState<ConfigsInput>({
    display_name: {value: '', obrigatory: true},
    description: {value: '', obrigatory: false}
  })

  const [image, setImage] = useState<Image | undefined>(undefined)

  useEffect(() => {
    if (user) {
      configsInput.display_name.value = user.display_name
      configsInput.description.value = user.description || ''

      setConfigsInput(structuredClone(configsInput))

      if (user.image) {
        setImage(new HostedImage(user.image))
      }
    }
  }, [user])

  return [[configsInput, setConfigsInput], [image, setImage]]
}
