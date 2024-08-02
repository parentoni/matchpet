import { Guard, GuardError } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { Timestamp } from "../../../shared/core/Timestamp";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { AnimalImages } from "./animal/AnimalImages";
import { AnimalDescription } from "./animal/AnimalDescription";
import { AnimalName } from "./animal/AnimalName";
import { ANIMAL_STATUS, AnimalStatus } from "./animal/AnimalStatus";
import { AnimalTraits } from "./animal/AnimalTraits";
import { AnimalCreated } from "./events/AnimalCreated";
import { AnimalStatusChanged } from "./events/AnimalStatusChanged";
import { AnimalEdited } from "./events/AnimalEdited";
import { Contacts } from "../../../shared/core/contacts/contacts";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { AnimalClicked } from "./events/AnimalClicked";
import { AnimalSex } from "./animal/AnimalSex";
import { AnimalImagesExport } from "./animal/AnimalImageExport";

export interface IAnimalProps {
  donatorId: UniqueGlobalId;
  name: AnimalName;
  image: AnimalImages;
  exportImage : AnimalImagesExport
  specieId: UniqueGlobalId;
  animalTrait: AnimalTraits;
  status: AnimalStatus;
  description: AnimalDescription;
  ibgeId: UniqueGlobalId;

  createdAt: Timestamp;
  lastModifiedAt: Timestamp;
  contact: Contacts;

  views: number;
  clicks: number;
  sex: AnimalSex
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

  get exportImage() : AnimalImagesExport {
    return this.props.exportImage
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
    return this.props.lastModifiedAt;
  }

  get contact(): Contacts {
    return this.props.contact;
  }

  get views(): number {
    return this.props.views;
  }

  get clicks(): number {
    return this.props.clicks;
  }

  get sex(): AnimalSex {
    return this.props.sex
  }

  get ibgeId(): UniqueGlobalId {
    return this.props.ibgeId;

  }

  public markAnimalAsEditied() {
    this.addDomainEvent(new AnimalEdited(this));
  }

  public incrementAnimalViewCount(i: number = 1) {
    this.props.views += i;
  }

  public incrementAnimalClickCount(i: number = 1) {
    this.props.clicks += i;
  }

  public markAnimalAsClicked() {
    this.addDomainEvent(new AnimalClicked(this));
    DomainEvents.dispatchEventsForAggregate(this._id);
  }

  public animalChangeStatus(newStatus: ANIMAL_STATUS): Either<GuardError, null> {
    const oldStatus = this.animalStatus.value;

    const response = AnimalStatus.create(newStatus);
    if (response.isLeft()) {
      return left(response.value);
    }

    this.props.status = response.value;

    this.addDomainEvent(new AnimalStatusChanged(this, newStatus, oldStatus));
    return right(null);
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
      { argumentName: "ANIMAL_CONTACT", argument: props.contact },
      { argumentName: "ANIMAL_CLICKS", argument: props.clicks },
      { argumentName: "ANIMAL_VIEWS", argument: props.views },
      { argumentName: "ANIMAL_IBGE", argument: props.ibgeId}
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
