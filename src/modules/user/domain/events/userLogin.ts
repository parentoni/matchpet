import { User } from "../user";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";

export class UserLogin implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueGlobalId {
    return this.user.id;
  }
}
