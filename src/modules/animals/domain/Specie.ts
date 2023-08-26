import { Guard, GuardError } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { SpecieTrait } from "./animal/SpecieTraits";

export interface SpecieProps {
    SpecieName: string,
    SpecieTraits: SpecieTrait[]
}

export class Specie extends AggregateRoot<SpecieProps> {
    get traits() {
        return this.props.SpecieTraits
    }

    get name() {
        return this.props.SpecieName
    }

    private constructor(props: SpecieProps, id?: UniqueGlobalId) {
        super(props, id)
    }

    public static create(props: SpecieProps, id?: UniqueGlobalId): Either<GuardError, Specie> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            {argument: props.SpecieName, argumentName: "SPECIE_NAME"},
        ])

        if (guardResult.isLeft()) {
            return left(guardResult.value)
        } else {
            return right(new Specie({SpecieName: props.SpecieName.toString(), SpecieTraits: props.SpecieTraits}, id))
        }


    }
}