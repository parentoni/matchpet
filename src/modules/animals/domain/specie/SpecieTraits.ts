import { GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { WatchList } from "../../../../shared/domain/WatchList";
import { ISpecieTraitPersistent } from "../../../../shared/infra/database/models/Specie";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { SpecieTrait } from "./SpecieTrait";
import { SpecieTraitOption } from "./SpecieTraitOption";
import { SpecieTraitPrint } from "./SpecieTraitPrint";

export class SpecieTraits extends WatchList<SpecieTrait> {
  compareItems(a: SpecieTrait, b: SpecieTrait): boolean {
    return a.equals(b)
  }

  constructor(traits:SpecieTrait[]) {
    super(traits)
  }

  public static create(traits:SpecieTrait[]) {
    return new SpecieTraits(traits)
  }

  public static createFromPersistent(traits: ISpecieTraitPersistent[]): Either<GuardError, SpecieTraits> {
    const traitDomainArray: SpecieTrait[] = []
    for (const trait of traits) {
      const print = SpecieTraitPrint.create({value: trait.print})
      const category = UniqueGlobalId.createExisting(trait.category)      
      const combineResult = EitherUtils.combine([category, print])

      if (combineResult.isLeft()) {
        return left(combineResult.value)
      }

      const optionArray: SpecieTraitOption[] = []
      for (const option of trait.options) {
        const optionResult = SpecieTraitOption.create({name: option.name}, new UniqueGlobalId(option._id.toString()))
        if (optionResult.isLeft()) {
          return left(optionResult.value)
        }

        optionArray.push(optionResult.value)
      }

      const traitResponse = SpecieTrait.create({
        options: optionArray,
        print: print.getRight(),
        optional: trait.optional,
        name: trait.name,
        category: category.getRight()
      }, new UniqueGlobalId(trait._id.toString()))

      if (traitResponse.isLeft()) {
        return left(traitResponse.value)
      }
      traitDomainArray.push(traitResponse.value)
    }

    return right(SpecieTraits.create(traitDomainArray))
  }
  
}