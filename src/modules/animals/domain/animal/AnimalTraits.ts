import { Guard, GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface AnimalTraitProps {
    specieTraitId: UniqueGlobalId,
    option_value: string
}

export class AnimalTrait extends ValueObject<AnimalTraitProps> {
    get value(): string {
        return this.props.option_value
    }

    get specieTraitId(): UniqueGlobalId {
        return this.props.specieTraitId
    }
    
    private static validate (props: AnimalTraitProps): Either<GuardError, AnimalTraitProps> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            {argument: props.specieTraitId, argumentName: "SPECIE_TRAIT_ID"},
            {argument: props.option_value, argumentName: "OPTION_VALUE"}
        ])

        if (guardResult.isLeft()) {
            return left(guardResult.value)
        }

        return right(props)
    }

    public static create(props: AnimalTraitProps) {
        const validateResult = this.validate(props)
        if (validateResult.isLeft()) {
            return left(validateResult.value)
        }

        return right(new AnimalTrait({
            ...props
        }))
    }
}