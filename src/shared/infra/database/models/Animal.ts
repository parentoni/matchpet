import mongoose from "mongoose";
import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";

const traitSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  value: { type: String, required: true }
});

export const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: [String], required: true },
  created_at: { type: Date, required: true },
  status: { type: String, enum: ["PENDING", "CANCELED", "DONATED"], required: true },
  donator_id: { type: mongoose.Types.ObjectId, required: true },
  specie_id: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  traits: { type: [traitSchema], required: true }
});

export interface IAnimalPersistent {
  _id: string;
  name: string;
  age: number;
  image: string[];
  created_at: Date;
  status: string;
  donator_id: string;
  specie_id: string;
  description: string;
  traits: IAnimalTraitsPersistent[];
}

export interface IAnimalTraitsPersistent {
  _id: string;
  value: string;
}

AnimalSchema.post("save", (t) => DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString() as string)));

const AnimalModel = mongoose.model("animal", AnimalSchema);
export { AnimalModel };
