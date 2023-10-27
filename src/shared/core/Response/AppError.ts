import { BaseError } from "./Error";

interface IUnexpectedError {
  errorMessage: string;
  code: string;
  location: string;
  error: any;
}
/**
 * @deprecated
 */
export namespace AppError {
  export class UnexpectedError extends BaseError<IUnexpectedError> {
    public constructor(err: any) {
      super({
        errorMessage: `An unexpected error occurred.`,
        error: err,
        code: "SERVER_ERROR",
        location: "App"
      });
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }
    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
