import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Animal } from "../Animal";

export class AnimalEdited implements IDomainEvent {
  public dateTimeOccurred: Date;
  public animal: Animal;

  constructor(animal: Animal) {
    this.animal = animal;
    this.dateTimeOccurred = new Date();
  }

  public getAggregateId(): UniqueGlobalId {
    return this.animal.id;
  }

  // public saveImage()
}
