import { Either, right, left } from "../core/result";

export class EitherUtils {
  
  public static combine<L>(array: Either<L, any>[]): Either<L, null> {
    for (const element of array) {
      if (element.isLeft()) {
        return left(element.value);
      }
    }

    return right(null);
  }

  public static get success(): true {
    return true;
  }
}
