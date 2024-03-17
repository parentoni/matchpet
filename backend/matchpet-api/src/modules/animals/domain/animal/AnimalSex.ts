import { Guard } from "../../../../shared/core/Guard"
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError"
import { Either, left, right } from "../../../../shared/core/Result"
import { ValueObject } from "../../../../shared/domain/ValueObject"

export enum ANIMAL_SEX {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export type AnimalSexProps = {
  sex: ANIMAL_SEX
}

export class AnimalSex extends ValueObject<AnimalSexProps> {

  get value() {
    return this.props.sex
  }

  static validate (sex: ANIMAL_SEX): Either<CommonUseCaseResult.InvalidValue, null> {
    // Null valid checks
    const guard = Guard.againstNullOrUndefined(sex, "ANIMAL_SEX")

    if (guard.isLeft()) {
    return left(guard.value)
    }

    //Check if sex variable is a valid sex
    if (!Object.keys(ANIMAL_SEX).includes(sex)) {
      return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: `The value ${sex} is not a valid sex.`,
          variable: "ANIMAL_SEX",
          location: `${AnimalSex.name}.${this.validate.name}`,
          printableErrorMessage:`O valor ${sex} não é um sexo válido`
      }))
    }

    return right(null)
  }

  static create(props: AnimalSexProps): Either<CommonUseCaseResult.InvalidValue, AnimalSex> {
    //Check using validate function if props are valid
    const result = this.validate(props.sex)

    if (result.isLeft()) {
      return left(result.value)
    }

    // If valid return new AnimalSex value object
    return right(new AnimalSex(props))
  }
}
