import mongoose from "mongoose";
import { Identifier } from "./Identifier";
import { Guard, GuardError } from "../core/Guard";
import { Either, left, right } from "../core/result";
export class UniqueGlobalId extends Identifier<string> {

  constructor(id?: string) {
    super(id ? id : new mongoose.Types.ObjectId().toString());
  }

  public static createExisting(id: string): Either<GuardError, UniqueGlobalId> {
    const guardResult = Guard.againstNullOrUndefined(id, "UNIVERSAL_GLOBAL_ID");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(new UniqueGlobalId(id));
  }
}
