import { ValueObject } from "../domain/ValueObject";

export type TimestampValue = { time: Date };

export class Timestamp extends ValueObject<TimestampValue> {
  get value(): Date {
    return this.props.time;
  }

  public static create(time?: Date) {
    if (time) {
      return new Timestamp({ time: time });
    }

    return new Timestamp({ time: new Date() });
  }
}
