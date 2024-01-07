import { useContext } from "react"
import { SpeciesContext } from "../../../../utils/context/SpeciesContext"
import { Animal, SEX } from "../../../../utils/domain/Animal"
import { IAnimalDTO } from "../../../../utils/services/dtos/AnimalDTO"
import { IUserPersistent } from "../../../../utils/services/dtos/UserDTO"

export type MainPictureProps = {
  user: IUserPersistent,
  animal: IAnimalDTO,
}

export const MainPicture = (props: MainPictureProps) => {
  
  const {species} = useContext(SpeciesContext)
  const domainAnimal = Animal.create(props.animal)
  return (
    <div className="w-80 h-80  bg-white relative">
      {/* Name and next page indicator */} 
      <div className="absolute bottom-8 right-0 w-full flex justify-end">
        <div className="max-w-[60%] bg-neutral-50 border p-2 flex flex-col border-r-0 rounded rounded-r-none ">
          <p className="text-sm">Adote <span className="text-primary">{props.animal.name}</span>, {domainAnimal.getSex(species) === SEX.FEMALE? "fêmea":"macho"}.</p>
          <p className="text-[0.5rem]"> Detalhes na <span className="text-primary">próxima página</span>.</p>
        </div>
      </div>
    {/*Copyright */}

    <div className="absolute top-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name} </span>
    </div>
    <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name}</span>
    </div>

    {/* Image container */}
    <div className="w-full h-full flex items-center justify-center bg-opacity-10  bg-primary">
      <img alt="Imagem principal do animal" src={props.animal.image[0]} className="w-auto h-auto max-w-full max-h-full " />
    </div>
    </div>
  )
}
