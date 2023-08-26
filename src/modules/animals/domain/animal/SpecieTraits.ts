import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface SpecieTraitProps {
    name: string,
    svg: ValidUrl,
    optional: boolean,
    category: string,
    options: string[]
}


export class SpecieTrait extends Entity<SpecieTraitProps> {

    private constructor (props: SpecieTraitProps, id?: UniqueGlobalId) {
        super(props, id)
    }

    get specieTraitId(): UniqueGlobalId {
        return this._id
    }

    public static create (props: SpecieTraitProps, id?: UniqueGlobalId): Either<GuardError, SpecieTrait> {


        const guardResponse = Guard.againstNullOrUndefinedBulk([
            {argument: props.name, argumentName: "SPECIE_PROPS_NAME"},
            {argument: props.svg, argumentName: "SPECIE_PROPS_SVG"},
            {argument: props.category, argumentName: "SPECIE_PROPS_CATEGORY"},
            {argument: props.options, argumentName: "SPECIE_PROPS_OPTIONS"},
            {argument: props.optional, argumentName: "SPECIE_PROPS_OPTIONAL"}
        ])

        
        if (guardResponse.isLeft()) {
            return left(guardResponse.value)
        }

        for (let option of props.options) {
            const optionGuardResponse = Guard.againstNullOrUndefined(option, "SPECIE_PROPS_SPECIFIC_OPTION")
            if (optionGuardResponse.isLeft()) {
                return left(optionGuardResponse.value)
            } 
        }

        return right(new SpecieTrait({...props, name: props.name.toString()}, id))
        
    }

}