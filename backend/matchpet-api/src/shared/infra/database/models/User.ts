import mongoose from "mongoose";
import { GeoJsonPointSchema } from "./Coordinate";

import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";
const userSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // cpf: { type: String, required: false },
  role: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  phone_number: { type: String, required: true },
  location: { type: GeoJsonPointSchema, required: true },
  completed_adoptions: { type: Number, default: 0 },
  in_adoption: { type: Number, default: 0 },
  last_login: { type: Date, required: true },
  ibgeId: {type: String, required: true},

  image: { type: String, required: false },
  description: { type: String, required: false }
});

export type IUserPersistant = {
  _id: string;
  display_name: string;
  username: string;
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
  last_login: Date;
  ibgeId: string

  image?: string;
  description?: string;
};

userSchema.post("save", (t) => {
  DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString()));
});

const UserModel = mongoose.model('users', userSchema)
export { UserModel }
