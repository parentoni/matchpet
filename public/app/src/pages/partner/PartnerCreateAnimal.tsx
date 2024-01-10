import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"
import { OutletContextType } from "../../elements/partner/new/PartnerBase"
import { Check, Menu } from "lucide-react"
import { PartnerCreateAnimalForm } from "../../elements/partner/new/PartnerCreateAnimalForm"
import { useContext, useEffect, useState } from "react"
import { HostedImage, IMAGE_TYPES, Image } from "../../utils/domain/Image"
import { AnimalInputErrors, AnimalInputTraits, AnimalInputTraitsErrors, AnimalInput } from "../../elements/partner/new/PartnerCreateAnimalFormTypes"
import { ANIMAL_STATUS } from "../../utils/services/dtos/AnimalDTO"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO"
import { Animal, CreateAnimalListingDTO, SEX } from "../../utils/domain/Animal"
import { AuthContext } from "../../utils/context/AuthContext"
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use"
import { FiltersContext } from "../../utils/context/FiltersContext"
const parseBrazilianTelefone = require('telefone/parse');

//Puta que pariu, urgente organizar esse arquivo!
//Puta que pariu, urgente organizar esse arquivo!
//Puta que pariu, urgente organizar esse arquivo!

export const PartnerCreateAnimal = () => {

  const {species} = useContext(SpeciesContext)
  const {getToken} = useContext(AuthContext)
  
  const [searchParams, setSearchParams] = useSearchParams()

  const {isOpen, setIsOpen} = useOutletContext() as OutletContextType
  const {id} = useParams() as {id: string}

  const [
    [animalInput, setAnimalInput],
    [animalInputTraits, setAnimalInputTraits],
    [images, setImages]
  ] = useGetAnimalInputs(id)

  const [animalInputErrors, setAnimalInputErrors] = useState<AnimalInputErrors>({ name: false, description: false, status: false, specie_id: false, whatsapp: false, email: false, sex:false});
  const [animalInputTraitsErrors, setAnimalInputTraitsErrors] = useState<AnimalInputTraitsErrors>({});

  const [imagesError, setImagesError] = useState<boolean>(false);
  const [iAmTheContact, setIAmTheContact] = useState(true);


  const {editCachedAnimal} = useContext(FiltersContext)

  const [loading, setLoading] = useState<boolean>(false)

  function changeAnimalInputErrors(key: keyof AnimalInput, value: boolean) {
    animalInputErrors[key] = value;
    setAnimalInputErrors(structuredClone(animalInputErrors));
  }

  function changeAnimalInputTraitsErrors(key: string, value: boolean) {
    animalInputTraitsErrors[key] = value;
    setAnimalInputTraitsErrors(structuredClone(animalInputTraitsErrors));
  }

  function checkForErrors(): number {
    let error = 0;
  
    for (const key of Object.keys(animalInput)) {
      if (key === 'whatsapp' || key === "email") {
        if (!iAmTheContact) {
          if ((animalInput[key as keyof AnimalInput].value === '' || !animalInput[key as keyof AnimalInput].value) && animalInput[key as keyof AnimalInput].obrigatory) {
            error++;
            changeAnimalInputErrors(key as keyof AnimalInput, true);
          } else {
            changeAnimalInputErrors(key as keyof AnimalInput, false);
          }
        } else {
          changeAnimalInputErrors(key as keyof AnimalInput, false);
        }
  
      } else {
        if (animalInput[key as keyof AnimalInput].value === '' || !animalInput[key as keyof AnimalInput].value && animalInput[key as keyof AnimalInput].obrigatory) {
          error++;
          changeAnimalInputErrors(key as keyof AnimalInput, true);
        } else {
          changeAnimalInputErrors(key as keyof AnimalInput, false);
  
        }
  
      }
    }
  
    if (animalInput.specie_id.value) {
      const specie = species.find(x => x._id === animalInput.specie_id.value) as ISpecieDTO;
      for (const trait of specie.traits) {
        if (!trait.optional && !animalInputTraits[`trait_${trait._id}`]) {
          error++;
          changeAnimalInputTraitsErrors(`trait_${trait._id}`, true);
        } else {
          changeAnimalInputTraitsErrors(`trait_${trait._id}`, false);
        }
      }
    }
  
    if (images.filter(a => a).length === 0) {
      error++;
      setImagesError(true);
    } else {
      setImagesError(false);
    }
    if (animalInput.whatsapp.value) {
      if (parseBrazilianTelefone(animalInput.whatsapp.value, { apenasCelular: true })) {
        changeAnimalInputErrors('whatsapp', false);
      } else {
        error++;
        changeAnimalInputErrors('whatsapp', true);
      }
    }
    return error;
  
  }
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = checkForErrors();
    
    if (error === 0 && !loading) {
      setLoading(true)
      
      const persistentImages:string[] = []

      for (const image of images.filter(a => a)) {
        if (image.type === IMAGE_TYPES.HOSTED) {
          persistentImages.push(image.data)
        } else if (image.type === IMAGE_TYPES.FILE) {
          const imageData = await Image.upload(image.data as File, getToken())

          if (imageData.isRight()) {
            persistentImages.push(imageData.value as string)
          }
          
          
        }
      }
      

      const traitsDto: { _id: string; value: string; }[] = [];

      for (const key of Object.keys(animalInputTraits)) {
        traitsDto.push({ _id: key.split('_')[1], value: animalInputTraits[key] });
      }
  
  
        const createNewAnimalProps: CreateAnimalListingDTO = {
          name: animalInput.name.value,
          image: persistentImages,
          specie_id: animalInput.specie_id.value,
          description: animalInput.description.value,
          traits: traitsDto,
          status: animalInput.status.value,
          sex: animalInput.sex.value

        };
  
        if (!iAmTheContact) {
          createNewAnimalProps.contact = [{ contact_type: 'WHATSAPP', contact_value: animalInput.whatsapp.value }];
          if (animalInput.email) {
            createNewAnimalProps.contact.push({ contact_type: 'EMAIL', contact_value: animalInput.email.value });
          }
        }
  
        if (id === 'new') {
          const response = await Animal.newAnimal(
            createNewAnimalProps,
            getToken()
          );
          if (response.isLeft()) {
            alert("Algo deu errado salvando o animal, contate parentoni.arthur@gmail.com ou +55 31 9 9904-9188")
          } else {
            setSearchParams({success: 'true'})
          }

        } else {
          const response = await Animal.editAnimal(
            createNewAnimalProps,
            getToken(),
            id
          );
          if (response.isLeft()) {
            alert("Algo deu errado salvando o animal, contate parentoni.arthur@gmail.com ou +55 31 9 9904-9188")
          } else {
            editCachedAnimal(response.value)
            
            setSearchParams({success: 'true'})
          }

          

        }



      
      
      setLoading(false)
    }

  };

  useEffect(() => {
    if (id) {
      if (id !== 'new') {
        setIAmTheContact(false)
      }
    }
  
  },[id])


  return (
    <>
      <div className="w-full flex flex-col h-screen overflow-y-auto relative">

        <header className="w-full sticky bg-white h-12 border-b flex items-center top-0 px-8 z-10 min-h-12">
          <button onClick={() => setIsOpen(true)} className="flex md:hidden h-12 gap-4 items-center ">
              <Menu />
              <h1 className=" font-medium text-xl">Todos animais</h1>
          </button>
        </header>

        <div className="w-full p-8 border-b">
          {id === 'new' ?
            <h1 className=" font-semibold text-2xl hidden md:block">Criar animal</h1>:
            <h1 className=" font-semibold text-2xl hidden md:block">Editar animal</h1>
          }
          <p>Crie e edite animais de forma padronizável e simples.</p>
        </div>

        <section className="p-8 flex-1 flex flex-col">
          {searchParams.get('success') === 'true'? <PartnerCreateAnimalSuccess />:
          loading ? <PartnerCreateAnimalLoadingSection />:
          <PartnerCreateAnimalForm 
            id={id}

            animalInput={animalInput}
            animalInputErrors={animalInputErrors}
            animalInputTraits={animalInputTraits}
            animalInputTraitsErrors={animalInputTraitsErrors}
            images={images}
            imagesError={imagesError}
            iAmTheContact={iAmTheContact}

            setAnimalInput={setAnimalInput}
            setAnimalInputErrors={setAnimalInputErrors}
            setAnimalInputTraits={setAnimalInputTraits}
            setAnimalInputTraitsErrors={setAnimalInputTraitsErrors}
            setImages={setImages}
            setImagesError={setImagesError}
            setIAmTheContact={setIAmTheContact} 
            onSubmit={onSubmit}
            
            />
        }
        </section>
      </div>
    </>
  )
}

export const PartnerCreateAnimalLoadingSection = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className=" loading text-primary loading-lg loading-spinner"></span>
      <h1 className="mt-4 text-xl font-medium">Salvando as informações do animal</h1>
      <p className="mt-2 text-sm ">Por favor, aguarde um momento e <span className=" text-primary">não feche a página</span>...</p>
    </div>
  )
}

export const PartnerCreateAnimalSuccess = () => {

  
  const { width, height } = useWindowSize()
  const navigate = useNavigate()
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center">
        <Check className="w-10 h-10 text-primary"/>
        <h1 className="mt-4 text-xl font-medium text-primary">Animal salvo com sucesso!</h1>
        <p className="mt-2 text-sm "><span className="text-primary">Parabéns</span> por mudar a vida de um animal. O que deseja fazer agora?</p>
        <div className="flex w-full gap-4 mt-8 md:flex-row flex-col">
          <button className="primary-button w-full" onClick={() => navigate('/partner/')}>Gerenciar animais</button>
          <button className="secondary-button w-full" onClick={() => navigate('/partner/animal/new')}>Criar um novo anúncio</button>
        </div>
      </div>

      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />
    </div>
  )
}

export const useGetAnimalInputs = (animalId: string): [[AnimalInput, (x: AnimalInput) => void], [AnimalInputTraits, (x: AnimalInputTraits) => void], [Image[], (x: Image[]) => void]] => {
  const [animalInput, setAnimalInput] = useState<AnimalInput>({ name: { value: '', obrigatory: true }, description: { value: '', obrigatory: true }, status: { value: ANIMAL_STATUS.PENDING, obrigatory: true }, specie_id: { value: '', obrigatory: true }, whatsapp: { value: '', obrigatory: true }, email: { value: '', obrigatory: false }, sex: {value: "" as SEX, obrigatory:true}});
  const [animalInputTraits, setAnimalInputTraits] = useState<AnimalInputTraits>({});
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (animalId) {
      if (animalId !== 'new') {
        Animal.getSpecific(animalId, false).then(animal => {
          if (animal.isLeft()) {
            return;
          }
          setAnimalInput({ name: { value: animal.value.props.name, obrigatory: true }, description: { value: animal.value.props.description, obrigatory: true }, status: { value: animal.value.props.status, obrigatory: true }, specie_id: { value: animal.value.props.specie_id, obrigatory: true },  whatsapp: { value: animal.value.props.contact?.find(e => e.contact_type === 'WHATSAPP')?.contact_value || '', obrigatory: true }, email: { value: animal.value.props.contact?.find(e => e.contact_type === 'EMAIL')?.contact_value || '', obrigatory: false }, sex: {value: animal.value.getSex(), obrigatory: true}})
          const traits: AnimalInputTraits = {};
          for (const trait of animal.value.props.traits) {
            traits[`trait_${trait._id}`] = trait.value;
          }

          setAnimalInputTraits(traits)

          const imageArray: Image[] = []
          for (const image of animal.value.props.image) {
            imageArray.push(new HostedImage(image))
          }

          setImages(imageArray)

        })
      } else {
        setAnimalInput({ name: { value: '', obrigatory: true }, description: { value: '', obrigatory: true }, status: { value: ANIMAL_STATUS.PENDING, obrigatory: true }, specie_id: { value: '', obrigatory: true }, whatsapp: { value: '', obrigatory: true }, email: { value: '', obrigatory: false }, sex: {value: "" as SEX, obrigatory:true}})
        setAnimalInputTraits({})
        setImages([])
      
      }
    }
  }, [animalId])
  return [[animalInput, setAnimalInput], [animalInputTraits, setAnimalInputTraits], [images, setImages]];
}

