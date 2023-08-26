import mongoose from "mongoose";
import { Identifier } from "./Identifier";
import * as crypto from "crypto";
export class UniqueGlobalId extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : new mongoose.Types.ObjectId().toString());
  }
}
