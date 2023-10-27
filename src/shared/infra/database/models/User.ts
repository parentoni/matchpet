import mongoose from "mongoose";
import { GeoJsonPointSchema } from "./Coordinate";
import { Location } from "../../../core/Location";
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // cpf: { type: String, required: false },
  role: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  phone_number: { type: String, required: true },
  location: { type: GeoJsonPointSchema, required: true },
  completed_adoptions: { type: Number, required: true },
  in_adoption: { type: Number, required: true }
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
  location: {
    type: "Point";
    coordinates: GeoJSON.Position;
  };
  completed_adoptions: number;
  in_adoption: number;
};

export default { name: "user", schema: userSchema };
