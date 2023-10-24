import mongoose from "mongoose";
import Coordinate, { ICoordinatePersistent } from "./Coordinate";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // cpf: { type: String, required: false },
  role: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  phone_number: { type: String, required: true },
  location: {type: Coordinate, required: true}
});

export type IUserPersistant = {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: number;
  verified: boolean;
  phone_number: string;
  location: ICoordinatePersistent
};


export default { name: "user", schema: userSchema };
