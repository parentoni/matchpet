import { Entity } from "../../../../shared/domain/Entity";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";

export class UserId extends Entity<null> {
  get id(): UniqueGlobalId {
    return this._id;
  }

  private constructor(id?: UniqueGlobalId) {
    super(null, id);
  }

  public static create(id?: UniqueGlobalId): UserId {
    return new UserId(id);
  }
}
