import { Guard, GuardError, GuardResponse } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserId } from "../../user/domain/userProps/userId";
import { AnimalAge } from "./animal/AnimalAge";
import { AnimalName } from "./animal/AnimalName";

export interface IAnimalProps {
    donatorId: UserId,
    name: AnimalName,
    age: AnimalAge,
    image: ValidUrl,
}

export type AnimalCreateResponse = Either<GuardError, Animal>

export class Animal extends AggregateRoot<IAnimalProps> {

    get donatorId(): UserId {
        return this.props.donatorId
    }

    get name(): AnimalName {
        return this.props.name
    }

    get age(): AnimalAge {
        return this.props.age
    }

    get image(): ValidUrl {
        return this.props.image
    }

    public static create (props: IAnimalProps): AnimalCreateResponse {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            {argumentName: "NAME", argument: props.name},
            {argumentName: "AGE", argument: props.age},
            {argumentName: "IMAGE", argument: props.image},
            {argumentName: "DONATOR_ID", argument: props.donatorId}
        ])

        if (guardResult.isLeft()) {
            return left(guardResult.value)
        }

        return right(new Animal({
            ...props
        }))
    }
}