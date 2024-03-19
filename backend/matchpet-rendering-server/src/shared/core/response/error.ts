import { Either } from "../result";
export type IBaseError = { errorMessage: string; location: string; statusCode: number };
export type IBaseResponse = Either<BaseError<IBaseError>, success>;
export type Iwatch<T> = { name: string; watch: T; error: string; printableErrorMessage: string };
export type success = true;

export class BaseError<T extends IBaseError> {
  private value: T;

  constructor(props: T) {
    this.value = props;
  }

  get error() {
    return this.value;
  }

  public prettyError() {
    return `[${this.value.location}]: ${this.value.errorMessage}`;
  }
}

export class GenericError<T extends IBaseError> extends BaseError<T> {
  constructor(props: T) {
    super(props);
  }

  public static create<T extends IBaseError>(props: T): GenericError<T> {
    return new GenericError(props);
  }
}
