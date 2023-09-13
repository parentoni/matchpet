import { Categories } from "../../utils/domain/Categories";
import { Specie } from "../../utils/domain/Specie";
import { IAnimalTraitsDTO } from "../../utils/dtos/AnimalDTO";

export function AnimalTraitsSlider ({Specie, AnimalTraits, Categories}: {Specie: Specie,Categories: Categories, AnimalTraits: IAnimalTraitsDTO[]}) {
  return(
    <div className="flex flex-col gap-2">
    {Categories.list.map((category, index) => {
      const traits = Specie.getTraitsThatMatchCategory(category.props._id)
      
      return(
        <div className="overflow-x-auto flex w-full gap-2 px-8 no-scrollbar" key={index}>
          {traits.map((trait, index) => {
            const animalTraitValue = AnimalTraits.find(el => el._id === trait._id)
            const animalTraitValueInString = trait.options.find(el => el._id === animalTraitValue?.value)
            return ( 
              <>
                {animalTraitValue && animalTraitValueInString &&
                <div className="flex justify-center brute-border rounded-full px-2 py-0.5 flex-shrink-0 items-center gap-2 border-1" key={index}>
                  <img src={category.props.svg} alt={category.props.name} className="h-3 aspect-square"></img>
                  <p className="text-xs font-light">{trait.print.replace("{x}", animalTraitValueInString.name)}</p>
                </div>}
              </>
              
            )
          })}
        </div>
      )
    })}
    </div>

)
}