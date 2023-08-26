/**
 * @description Uma entidade é um objeto que é unico e DEVE ser acessado por seu id
 */

import { UniqueGlobalId } from "./UniqueGlobalD";

const isEntity = (obj: any): obj is Entity<any> => {
  return obj instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueGlobalId;
  public readonly props: T;

  constructor(props: T, id?: UniqueGlobalId) {
    this._id = id ? id : new UniqueGlobalId();
    this.props = props;
  }

  public equals(entity: Entity<any>) {
    if (!entity || !isEntity(entity)) {
      return false;
    }

    return this._id.toValue() === entity._id.toValue();
  }
}
