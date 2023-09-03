import { Guard, GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";

export interface SpecieTraitOptionProps {
    name: string
}

export class SpecieTraitOption extends Entity<SpecieTraitOptionProps> {

    get optionId(): UniqueGlobalId {
        return this._id
    }
    public static create(props: SpecieTraitOptionProps, id?: UniqueGlobalId): Either<GuardError, SpecieTraitOption> {
        const guard = Guard.againstNullOrUndefined(props.name, 'SPECIE_TRAITS_OPTIONS_NAME')
        if (guard.isLeft()) {
            return left(guard.value)
        }

        return right(new SpecieTraitOption(props, id))
    }

}