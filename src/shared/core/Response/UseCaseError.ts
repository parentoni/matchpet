import { Interface } from "readline";
import { BaseError, IBaseError } from "./Error";

interface ICommonInvalidValueProps {
  errorMessage: string;
  variable: string;
  location: string;
  printableErrorMessage?: string
}

interface IUnexpectedError {
  errorMessage: string;
  code: string;
  location: string;
  error: any;
}

interface ICommonInvalidValue extends ICommonInvalidValueProps {
  code: string;
}

export namespace CommonUseCaseResult {
  export class InvalidValue extends BaseError<ICommonInvalidValue> {
    public constructor(props: ICommonInvalidValueProps) {
      super({
        errorMessage: props.errorMessage,
        code: `INVALID_${props.variable.toUpperCase()}`,
        location: props.location,
        variable: props.variable,
        printableErrorMessage: props.printableErrorMessage  
      });
    }

    public static create(props: ICommonInvalidValueProps): InvalidValue {
      return new InvalidValue(props);
    }
  }

  export class Conflict extends BaseError<ICommonInvalidValue> {
    public constructor(props: ICommonInvalidValueProps) {
      super({
        errorMessage: props.errorMessage,
        code: `CONFLICT_${props.variable.toUpperCase()}`,
        location: props.location,
        variable: props.variable,
        printableErrorMessage: props.printableErrorMessage  

      });
    }

    public static create(props: ICommonInvalidValueProps): Conflict {
      return new Conflict(props);
    }
  }

  export class UnexpectedError extends BaseError<IUnexpectedError> {
    public constructor(err: any) {
      super({
        errorMessage: `An unexpected error occurred.`,
        error: err,
        code: "SERVER_ERROR",
        location: "App",
        
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }
    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class Forbidden extends BaseError<ICommonInvalidValue> {
    public constructor(props: ICommonInvalidValueProps) {
      super({
        errorMessage: props.errorMessage,
        code: `FORBIDDEN_${props.variable.toUpperCase()}`,
        location: props.location,
        variable: props.variable,
        printableErrorMessage: props.printableErrorMessage  

      });
    }

    public static create(props: ICommonInvalidValueProps): Forbidden {
      return new Forbidden(props);
    }
  }
}
