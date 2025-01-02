import { useContext } from "react"
import { CategoriesContext } from "../../../../utils/context/CategoriesContext"
import { SpeciesContext } from "../../../../utils/context/SpeciesContext"
import { Animal } from "../../../../utils/domain/Animal"
import { Specie } from "../../../../utils/domain/Specie"
import { IAnimalDTO } from "../../../../utils/services/dtos/AnimalDTO"
import { ISpecieDTO } from "../../../../utils/services/dtos/SpecieDTO"
import { IUserPersistent } from "../../../../utils/services/dtos/UserDTO"

export type TraitsImageProps = {
  animal: IAnimalDTO
  user: IUserPersistent
  hasGallery: boolean 
}

export const TraitsImage = (props: TraitsImageProps) => {

  const {species} = useContext(SpeciesContext)
  const {categories} = useContext(CategoriesContext)

  const domainAnimal = Animal.create(props.animal)
  const domainSpecie = Specie.create(species.find(a => a._id === props.animal.specie_id) as ISpecieDTO)

  return (
    <div className="w-80 h-80  bg-white relative ">
      {/* Name and next page indicator */} 
      <div className="absolute bottom-8 right-0 w-full flex justify-end">
        <div className="max-w-[60%] bg-neutral-50 border p-2 flex flex-col border-r-0 rounded rounded-r-none ">
          {props.hasGallery ? 
          <p className="text-[0.5rem]"> Veja a galeria de imagens do animal nas <span className="text-primary">próximas páginas</span>.</p>:
          <p className="text-[0.5rem]"> Veja como adotar o animal na <span className="text-primary">próxima página</span>.</p>
          }
        </div>
      </div>
    {/*Copyright*/}
      <div className="absolute top-0 left-0 flex items-center justify-center w-full">
        <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name} </span>
      </div>
      <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
        <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name}</span>
      </div>

      <div className="w-full h-full bg-primary bg-opacity-10 p-4 flex flex-col gap-2">
        {categories.map((category, index) => 
          <div key={index}>
            <p className="text-primary">{category.name}</p>
            <ul className="">
              {domainSpecie.getTraitsThatMatchCategory(category._id).map((trait) => 
                <li className="text-xs">&#x2022; { trait.print.replace("{x}", trait.options.find(a => a._id === domainAnimal.getTraitById(trait._id)?.value)?.name || '')}	</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
