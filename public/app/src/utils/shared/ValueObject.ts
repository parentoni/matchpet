/**
 * @method ValueObject
 * @desc Value Object é um objeto generico, ou seja sem identificador definido (ver  Entity)
 */

export interface ValueObjectParams {
  [x: string]: any;
}

export abstract class ValueObject<T extends ValueObjectParams> {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

  abstract get value(): any;

  public equals(comparation?: ValueObject<T>) {
    if (!comparation || !this.props) {
      return false;
    }

    return JSON.stringify(comparation) === JSON.stringify(this.props);
  }
}
