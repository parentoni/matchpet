import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Animal } from "../Animal";
import { ANIMAL_STATUS } from "../animal/AnimalStatus";

export class AnimalStatusChanged implements IDomainEvent {
  public dateTimeOccurred: Date;
  public animal: Animal;
  public newStatus: ANIMAL_STATUS;
  public oldStatus: ANIMAL_STATUS;

  constructor(animal: Animal, newStatus: ANIMAL_STATUS, oldStatus: ANIMAL_STATUS) {
    this.animal = animal;
    this.dateTimeOccurred = new Date();
    this.newStatus = newStatus
    this.oldStatus = oldStatus
  }

  public getAggregateId(): UniqueGlobalId {
    return this.animal.id;
  }
}
