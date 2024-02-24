import { success } from "../core/Response/Error";
import { Either, left, right } from "../core/Result";

export class EitherUtils {
  public static combine<L>(array: Either<L, any>[]): Either<L, success> {
    for (const element of array) {
      if (element.isLeft()) {
        return left(element.value);
      }
    }

    return right(this.success);
  }

  public static get success(): true {
    return true;
  }
}
