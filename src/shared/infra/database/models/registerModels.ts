import mongoose from "mongoose";
import userSchema from "./User";

export interface IModels {
  user: any;
}

export const createModels = () => {
  mongoose.model(userSchema.name, userSchema.schema);
  return mongoose.models;
};
