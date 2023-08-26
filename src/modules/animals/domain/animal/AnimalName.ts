import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, right, left } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export class AnimalName extends ValueObject<{value: string}> {
    get value(): any {
        return this.props.value
    }

    private static validate(name:string): Either<CommonUseCaseResult.InvalidValue, string> {
        const formatedName = name.trim()
        if (formatedName.length <= 100 && formatedName.length > 1) {
            return right(formatedName)
        } else {
            return left(CommonUseCaseResult.InvalidValue.create({
                location: `${AnimalName.name}.${this.validate}`,
                variable: "ANIMAL_NAME",
                errorMessage: "Animal name length must be between boundaries: 100 => name > 2 "
            }))
        }

    }
    
}