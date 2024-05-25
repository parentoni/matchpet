import { Categories } from "../../utils/domain/Categories";
import { Specie } from "../../utils/domain/Specie";
import { IAnimalTraitsDTO } from "../../utils/services/dtos/AnimalDTO";

export function AnimalTraitsPC ({Specie, AnimalTraits, Categories, }: {Specie: Specie,Categories: Categories, AnimalTraits: IAnimalTraitsDTO[]}) {

  return(
    <div className="px-8">
      <h2 className="text-2xl text-primary font-semibold">Sobre o animal:</h2>
      <div className={`grid grid-cols-2 mt-2 gap-2 grid-rows-[${Math.ceil(AnimalTraits.length / 2)}]`}>
      {Categories.list.map((category, index) => {
        const traits = Specie.getTraitsThatMatchCategory(category.props._id)
        return(traits.map((trait, index) => {
          const animalTraitValue = AnimalTraits.find(el => el._id === trait._id)
          const animalTraitValueInString = trait.options.find(el => el._id === animalTraitValue?.value)
          return (
            <>
                {animalTraitValue && animalTraitValueInString &&
                <div className=" col-span-1 row-span-1 flex gap-3 " key={index}>
                  <img src={category.props.svg} alt={category.props.name} className="h-7 aspect-square"></img>
                  <p className="lg:text-lg text-sm truncate">{trait.print.replace("{x}", animalTraitValueInString.name)}</p>
                </div>}
              </>
          )
        })
        )
      })}
      </div>

    </div>

  )
}