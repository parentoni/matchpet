import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { Animal } from "../../utils/domain/Animal"
import { ANIMAL_STATUS, IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { AnimalImage } from "../../elements/SpecificAnimal/AnimalImage"
import { CategoriesContext } from "../../utils/context/CategoriesContext"
import { Specie } from "../../utils/domain/Specie"
import { Species } from "../../utils/domain/Species"
import { Categories } from "../../utils/domain/Categories"
import { AnimalDescription } from "../../elements/SpecificAnimal/AnimalDescription"
import { AnimalContactButton } from "../../elements/SpecificAnimal/AnimalContactButton"
import { IUserContactDTO } from "../../utils/services/dtos/UserContactDTO"
import { User } from "../../utils/domain/User"
import { ISpecieDTO } from "../../utils/services/dtos/SpecieDTO"
import { AnimalAction } from "../../elements/SpecificAnimal/AnimalActions"
import { AnimalTraits } from "../../elements/SpecificAnimal/AnimalTraits"

export const SpecificAnimal = () => {

  const {animalId} = useParams();
  const {species} = useContext(SpeciesContext);
  const {categories} = useContext(CategoriesContext);

  const [selectedAnimalDTO, setSelectedAnimalDTO] = useState<IAnimalDTO>()
  const [contactInfo, setContactInfo] = useState<IUserContactDTO>()
  const [selectedSpecie, setSelectedSpecie] = useState<ISpecieDTO>()
  const [isMale, setIsMale] = useState<boolean>()

  const navigate = useNavigate()

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
      <div className="flex flex-col gap-3">
        <AnimalAction AnimalId={selectedAnimalDTO._id}/>
        <AnimalImage AnimalImages={selectedAnimalDTO.image} AnimalName={selectedAnimalDTO.name} AnimalId={selectedAnimalDTO._id}/>
        
        <AnimalDescription description={selectedAnimalDTO.description} AnimalName={selectedAnimalDTO.name}/>
        
        <AnimalContactButton animal={selectedAnimalDTO}/>
        <button className="px-8 text-sm items-start text-start" onClick={() => navigate(`/p/${contactInfo?.username}`)}>
          Responsável: &nbsp;
          <span className="text-primary font-medium">{contactInfo?.display_name}</span>
        </button>
        <div className="px-8 pt-2 w-full">
          <div className="border"></div>
        </div>
        <AnimalTraits AnimalTraits={selectedAnimalDTO.traits} Specie={Species.createFromDTO(species).findByID(selectedAnimalDTO.specie_id) as Specie} Categories={Categories.createFromDTO(categories)}/>
      </div>}
    </>
  )
}
