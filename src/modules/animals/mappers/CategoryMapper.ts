import { GuardError } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { ICategoryPersistent } from "../../../shared/infra/database/models/Category";
import { Category } from "../domain/Category";

export class CategoryMapper {
  public static toDomain(props: ICategoryPersistent): Either<GuardError, Category> {
    const svgInUrl = ValidUrl.create({ value: props.svg });
    if (svgInUrl.isLeft()) {
      return left(svgInUrl.value);
    }

    const createResult = Category.create({ svg: svgInUrl.value, name: props.name }, new UniqueGlobalId(props._id.toString()));

    if (createResult.isLeft()) {
      return left(createResult.value);
    }

    return right(createResult.value);
  }

  public static toPersistent(props: Category): ICategoryPersistent {
    return {
      _id: props.id.toValue(),
      svg: props.svg.value,
      name: props.name
    };
  }
}
