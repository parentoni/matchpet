import { Guard, GuardError } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";

export interface CategoryProps {
  svg: ValidUrl,
  name:string
}

export class Category extends AggregateRoot<CategoryProps> {
  get svg(): ValidUrl {
    return this.props.svg
  }

  get name ():string {
    return this.props.name
  }

  public static create(props: CategoryProps, id?: UniqueGlobalId): Either<GuardError, Category> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {argument: props.svg, argumentName: "CATEGORY_SVG"},
      {argument: props.name, argumentName: "CATEGORY_NAME"}
    ])

    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    return right(new Category({
      name: props.name,
      svg: props.svg
    }, id))
  }
}