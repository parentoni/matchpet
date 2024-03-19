import { UniqueGlobalId } from "../UniqueGlobalD";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueGlobalId;
}
