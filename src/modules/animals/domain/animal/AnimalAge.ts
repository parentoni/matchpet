import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface IAnimalAge {
    months: number
}

export class AnimalAge extends ValueObject<IAnimalAge> {

    protected static MAX_AGE = 12 * 20 // 20 years in months
    protected static MIN_AGE = 0

    get value(): number {
        return this.props.months
    }

    private static validate (months: number): Either<GuardError, number> {
        
        const guardResult = Guard.inRange(months, this.MIN_AGE, this.MAX_AGE, "AGE")
        if (guardResult.isLeft()) {
            return left(guardResult.value)
        }

        return right(months)
    }

    public static create (props: IAnimalAge) {
        const guardResult = Guard.againstNullOrUndefined(props.months, "AGE")
        if (guardResult.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                variable: "AGE_IN_MONTHS",
                location: `${AnimalAge.name}.${this.create.name}`,
                errorMessage: "Animal age not found"
            }))
        }
        const validateResult = this.validate(props.months)
        if (validateResult.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                variable: "AGE_IN_MONTHS",
                location: `${AnimalAge.name}.${this.create.name}`,
                errorMessage: validateResult.value.prettyError()
            }))
        }

        return right(new AnimalAge({
            months: validateResult.value
        }))
    }
    
}