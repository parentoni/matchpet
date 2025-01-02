import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { Animal } from "../../utils/domain/Animal"
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { CategoriesContext } from "../../utils/context/CategoriesContext"
import { Specie } from "../../utils/domain/Specie"
import { Species } from "../../utils/domain/Species"
import { Categories } from "../../utils/domain/Categories"
import { AnimalContactButton } from "../../elements/SpecificAnimal/AnimalContactButton"
import { IUserContactDTO } from "../../utils/services/dtos/UserContactDTO"
import logo from '../../assets/logo.svg'
import { User } from "../../utils/domain/User"
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO"
import { AnimalImagePC } from "../../elements/SpecificAnimalPC/AnimalImage"
import { AnimalInfoPC } from "../../elements/SpecificAnimalPC/AnimalInfo"
import { AnimalTraitsPC } from "../../elements/SpecificAnimalPC/AnimalTraitsPC"
import { Share2 } from "lucide-react"
import { MoveLeft } from "lucide-react"
export const SpecificAnimalPC = () => {

  const {animalId} = useParams();
  const {species} = useContext(SpeciesContext);
  const {categories} = useContext(CategoriesContext);
  const [width, setWidth] = useState(window.innerWidth * 0.75 * 0.5)
  const [selectedAnimalDTO, setSelectedAnimalDTO] = useState<IAnimalDTO>()
  const [contactInfo, setContactInfo] = useState<IUserContactDTO>()
  const [selectedSpecie, setSelectedSpecie] = useState<ISpecieDTO>()
  const [isMale, setIsMale] = useState<boolean>()

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth * 0.75 * 0.5)
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    
    Animal.getSpecific(animalId as string).then((response) => {
      if (response.isLeft()) {
        alert("Não foi posível encontrar o animal.")
      } else {
        //Check if animal is available
        if (response.value.props.status === ANIMAL_STATUS.PENDING) {
          setSelectedAnimalDTO(response.value.props)
        } else {
          navigate('/animals')
        }
      }
    })

  }, [animalId])

  useEffect(() => {
    if (selectedAnimalDTO) {
      User.getUserContactInfo(selectedAnimalDTO.donator_id).then(response => {
        if (response.isLeft()) {
          alert("Não foi posível encontrar informacoes sobre o doador.")
        } else {
          setContactInfo(response.value)
        }
      })
    }
  }, [selectedAnimalDTO])

  //Clean code bizarro.
  useEffect(() => {
    if (selectedAnimalDTO) {
      const currentSpecie = Species.createFromDTO(species).findByID(selectedAnimalDTO.specie_id) as Specie
      if (currentSpecie) {
        setSelectedSpecie(currentSpecie.props)
      const sexoTrait = currentSpecie.getTraitByVariable("name", "Sexo")
      if (sexoTrait) {
        const selectedOptionValue = currentSpecie.getTraitOptionValueById(sexoTrait._id, Animal.create(selectedAnimalDTO).getTraitById(sexoTrait._id)?.value || '')
        if (selectedOptionValue) {
          if (selectedOptionValue.name === 'Fêmea') {
            setIsMale(false)
          } else {
            setIsMale(true)
          }
        }
      }
      }
    }
    }, [selectedAnimalDTO, species])
  
  return(
    <>
      {selectedAnimalDTO && selectedSpecie &&
      <div className="flex  h-screen overflow-hidden   w-full items-center  flex-col gap-3">

        
        <div className="w-full mx-auto flex border-b-2 bg-white justify-between px-8 py-6">
        <button className="w-12 h-12 p-1 rounded-full bg-white md:bg-gray-100 flex justify-center items-center" onClick={() => {
        if (location.key !== 'default') {
          navigate(-1)
        } else {
          navigate('/animals')
        }
        }}>
        <MoveLeft />

      </button>

      <img src={logo} width={90} alt='Matchpet logo' className=' cursor-pointer' onClick={() => navigate('/')}></img>

      
      <button className="w-12 h-12 p-1 rounded-full bg-white md:bg-gray-100 flex justify-center items-center" onClick={() => navigator.clipboard.writeText(`https://www.matchpet.org/animals/${animalId}`).then(() => alert("Link copiado."), () => alert(`O link do animal é: https://www.matchpet.org/animals/${animalId}`))}>
        <Share2 />
      </button>
          {/* <button onClick={() => console.log('asd')}>
            <img src={Hamburguer} alt='Menu' width={42}></img> 
          </button> */}
        </div> 

        {/* <AnimalAction AnimalId={selectedAnimalDTO._id}/> */}
        <div className="w-[75%] self-center snap-center h-full  pt-4 ">
        
            <div className='flex h-full  flex-row'>
                <div id="Test" className='h-full w-[50%]'>
                    <AnimalImagePC AnimalImages={selectedAnimalDTO.image} AnimalName={selectedAnimalDTO.name} AnimalId={selectedAnimalDTO._id}/>
                </div>
                <div style={{height: `${width}px`}} className={` w-[50%]  flex flex-col justify-between`}>
                  <div className="flex flex-col gap-4">
                    <AnimalInfoPC AnimalId={animalId as string} description={selectedAnimalDTO.description} AnimalName={selectedAnimalDTO.name} AnimalSex={isMale === true? "Macho" : "Fêmea"} AnimalSpecie={selectedSpecie.name}/>
                    <AnimalTraitsPC  AnimalTraits={selectedAnimalDTO.traits} Specie={Species.createFromDTO(species).findByID(selectedAnimalDTO.specie_id) as Specie} Categories={Categories.createFromDTO(categories)}/>
                  </div>

                    <AnimalContactButton animal={selectedAnimalDTO}/>
                </div>
                

            </div>
        </div>
      
      </div>}
    </>
  )
}
