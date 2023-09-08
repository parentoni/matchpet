import { Guard, GuardError, GuardResponse } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { Timestamp } from "../../../shared/core/Timestamp";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserId } from "../../user/domain/userProps/userId";
import { AnimalAge } from "./animal/AnimalAge";
import { AnimalImages } from "./animal/AnimalImages";
import { AnimalName } from "./animal/AnimalName";
import { AnimalStatus } from "./animal/AnimalStatus";
import { AnimalTrait } from "./animal/AnimalTraits";

export interface IAnimalProps {
  donatorId: UniqueGlobalId;
  name: AnimalName;
  age: AnimalAge;
  image: AnimalImages;
  specieId: UniqueGlobalId;
  animalTrait: AnimalTrait[];
  createdAt: Timestamp;
  status: AnimalStatus;
}

export type AnimalCreateResponse = Either<GuardError, Animal>;

export class Animal extends AggregateRoot<IAnimalProps> {
  get donatorId(): UniqueGlobalId {
    return this.props.donatorId;
  }

  get specieId(): UniqueGlobalId {
    return this.props.specieId;
  }

  get name(): AnimalName {
    return this.props.name;
  }

  get age(): AnimalAge {
    return this.props.age;
  }

  get image(): AnimalImages {
    return this.props.image;
  }

  get animalTraits(): AnimalTrait[] {
    return this.props.animalTrait || [];
  }

  get createdAt(): Timestamp {
    return this.props.createdAt;
  }

  get animalStatus(): AnimalStatus {
    return this.props.status;
  }

  public static create(props: IAnimalProps, id?: UniqueGlobalId): AnimalCreateResponse {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: "NAME", argument: props.name },
      { argumentName: "AGE", argument: props.age },
      { argumentName: "IMAGE", argument: props.image },
      { argumentName: "DONATOR_ID", argument: props.donatorId },
      { argumentName: "ANIMAL_TRAIT", argument: props.animalTrait },
      { argumentName: "ANIMAL_STATUS", argument: props.status }
    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(
      new Animal(
        {
          ...props
        },
        id
      )
    );
  }
}
