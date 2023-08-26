import { Either, right, left } from "./Result";
import { GenericError, IBaseError, success } from "./Response/Error";
export type GuardError = GenericError<IBaseError>
export type GuardResponse = Either<GenericError<IBaseError>, success>;
export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: GuardResponse[]): GuardResponse {
    for (let result of guardResults) {
      if (result.isLeft()) return left(result.value);
    }

    return right(true);
  }

  public static greaterThan(minValue: number, actualValue: number): GuardResponse {
    return actualValue > minValue
      ? right(true)
      : left(
          GenericError.create({
            errorMessage: `Number given {${actualValue}} is not greater than {${minValue}}`,
            location: `${Guard.name}.${this.greaterThan.name}`
          })
        );
  }

  public static againstAtLeast(numChars: number, text: string): GuardResponse {
    return text.length >= numChars
      ? right(true)
      : left(
          GenericError.create({
            errorMessage: `Text is not at least ${numChars} chars.`,
            location: `${Guard.name}.${this.againstAtLeast.name}`
          })
        );
  }

  public static againstAtMost(numChars: number, text: string): GuardResponse {
    return text.length <= numChars
      ? right(true)
      : left(
          GenericError.create({
            errorMessage: `Text is greater than ${numChars} chars.`,
            location: `${Guard.name}.${this.againstAtMost.name}`
          })
        );
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): GuardResponse {
    if (argument === null || argument === undefined || argument === '') {
      return left(
        GenericError.create({
          errorMessage: `${argumentName} is null or undefined`,
          location: `${Guard.name}.${this.againstAtLeast.name}`
        })
      );
    } else {
      return right(true);
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): GuardResponse {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isLeft()) {
        return left(result.value);
      }
    }

    return right(true);
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string): GuardResponse {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return right(true);
    } else {
      return left(
        GenericError.create({
          errorMessage: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
            validValues
          )}. Got "${value}".`,
          location: `${Guard.name}.${this.isOneOf.name}`
        })
      );
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): GuardResponse {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return left(
        GenericError.create({
          errorMessage: `${argumentName} is not within range ${min} to ${max}.`,
          location: `${Guard.name}.${this.inRange.name}`
        })
      );
    } else {
      return right(true);
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): GuardResponse {
    let failingResult: GuardResponse | null = null;

    for (let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (numIsInRangeResult.isRight()) failingResult = numIsInRangeResult;
    }

    if (failingResult !== null) {
      return left(
        GenericError.create({
          errorMessage: `${argumentName} is not within the range.`,
          location: `${Guard.name}.${this.allInRange.name}`
        })
      );
    } else {
      return right(true);
    }
  }

  public static inArray<T>(value: T, array: T[], argumentName: string): GuardResponse {
    if (!array.includes(value)) {
      return right(true);
    } else {
      return left(
        GenericError.create({
          errorMessage: `${argumentName} is in guarded array.`,
          location: `${Guard.name}.${Guard.inArray.name}`
        })
      );
    }
  }

  public static againstEmpty(array: any[], argumentName: string): GuardResponse {
    if (array.length > 0) {
      return right(true);
    } else {
      return left(
        GenericError.create({
          errorMessage: `Array ${argumentName} is empty.`,
          location: `${Guard.name}.${this.againstEmpty.name}`
        })
      );
    }
  }
}
