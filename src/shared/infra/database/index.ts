import mongoose from "mongoose";
import { IModels, createModels } from "./models/registerModels";

export class Database {
  private register: mongoose.Models;
  public static instace: Database;

  private constructor() {
    this.register = createModels();
  }

  static getInstance() {
    if (!this.instace) {
      this.instace = new Database();
    }

    return this.instace;
  }

  get models() {
    return this.register;
  }
}
