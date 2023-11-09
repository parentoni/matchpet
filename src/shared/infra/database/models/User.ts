import mongoose from "mongoose";
import { GeoJsonPointSchema } from "./Coordinate";

import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";
const userSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // cpf: { type: String, required: false },
  role: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  phone_number: { type: String, required: true },
  location: { type: GeoJsonPointSchema, required: true },
  completed_adoptions: { type: Number, default: 0 },
  in_adoption: { type: Number, default: 0 },
  last_login: {type: Date, required: true}
});

export type IUserPersistant = {
  _id: string;
  display_name: string;
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
};

// userSchema.post('findOne', t => {DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString()))})
// userSchema.post('save', t => {DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString()))})

export default { name: "user", schema: userSchema };
