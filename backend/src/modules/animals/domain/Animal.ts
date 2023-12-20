import { Guard, GuardError, GuardResponse } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { Timestamp } from "../../../shared/core/Timestamp";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { UserId } from "../../user/domain/userProps/userId";
import { AnimalAge } from "./animal/AnimalAge";
import { AnimalImages } from "./animal/AnimalImages";
import { AnimalDescription } from "./animal/AnimalDescription";
import { AnimalName } from "./animal/AnimalName";
import { ANIMAL_STATUS, AnimalStatus } from "./animal/AnimalStatus";
import { AnimalTrait } from "./animal/AnimalTrait";
import { AnimalTraits } from "./animal/AnimalTraits";
import { AnimalCreated } from "./events/AnimalCreated";
import { AnimalStatusChanged } from "./events/AnimalStatusChanged";
import { AnimalEdited } from "./events/AnimalEdited";
import { Contacts } from "../../../shared/core/contacts/contacts";

export interface IAnimalProps {
  donatorId: UniqueGlobalId;
  name: AnimalName;
  image: AnimalImages;
  specieId: UniqueGlobalId;
  animalTrait: AnimalTraits;
  status: AnimalStatus;
  description: AnimalDescription;
  
  createdAt: Timestamp;
  lastModifiedAt: Timestamp
  contact: Contacts
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

  get image(): AnimalImages {
    return this.props.image;
  }

  get animalTraits(): AnimalTraits {
    return this.props.animalTrait;
  }

  get createdAt(): Timestamp {
    return this.props.createdAt;
  }

  get animalStatus(): AnimalStatus {
    return this.props.status;
  }

  get description(): AnimalDescription {
    return this.props.description;
  }

  get lastModifiedAt(): Timestamp {
    return this.props.lastModifiedAt
  }
  
  get contact(): Contacts {
    return this.props.contact
  }

  public markAnimalAsEditied() {
    this.addDomainEvent(new AnimalEdited(this))
  }

  public animalChangeStatus(newStatus: ANIMAL_STATUS): Either<GuardError, null>{
    const oldStatus = this.animalStatus.value
    
    const response = AnimalStatus.create(newStatus)
    if (response.isLeft()) {
      return left(response.value)
    }

    this.props.status = response.value

    this.addDomainEvent(new AnimalStatusChanged(this, newStatus, oldStatus))
    return right(null)
  }

  public static create(props: IAnimalProps, id?: UniqueGlobalId): AnimalCreateResponse {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: "NAME", argument: props.name },
      { argumentName: "IMAGE", argument: props.image },
      { argumentName: "DONATOR_ID", argument: props.donatorId },
      { argumentName: "ANIMAL_TRAIT", argument: props.animalTrait },
      { argumentName: "ANIMAL_STATUS", argument: props.status },
      { argumentName: "ANIMAL_DESCRIPTION", argument: props.description },
      { argumentName: "ANIMAL_CREATED_AT", argument: props.createdAt },
      { argumentName: "ANIMAL_LAST_MODIFIED_AT", argument: props.createdAt },

    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const isNew = !!id === false;
    const animal = new Animal(
      {
        ...props
      },
      id
    );

    if (isNew) {
      animal.addDomainEvent(new AnimalCreated(animal));
    }
    return right(animal);
  }
}
