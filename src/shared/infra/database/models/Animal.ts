import mongoose from "mongoose";
import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";
import { ANIMAL_STATUS } from "../../../../modules/animals/domain/animal/AnimalStatus";

const traitSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  value: { type: String, required: true }
});

export const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: [String], required: true },
  status: { type: String, enum: ["PENDING", "CANCELED", "DONATED"], required: true },
  donator_id: { type: mongoose.Types.ObjectId, required: true },
  specie_id: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  traits: { type: [traitSchema], required: true },
  created_at: { type: Date, required: true },
  last_modified_at: {type: Date, required:true}
});

//db.animals.updateMany({}, {$set: {last_modified_at: new Date()}})
export interface IAnimalPersistent {
  _id: string;
  name: string;
  age: number;
  image: string[];
  created_at: Date;
  status: ANIMAL_STATUS;
  donator_id: string;
  specie_id: string;
  description: string;
  traits: IAnimalTraitsPersistent[];
  last_modified_at: Date
}

export interface IAnimalTraitsPersistent {
  _id: string;
  value: string;
}

AnimalSchema.post("save", (t) => DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString() as string)));
AnimalSchema.post("findOneAndUpdate", (t) => {DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString() as string))});


const AnimalModel = mongoose.model("animal", AnimalSchema);
export { AnimalModel };
