import mongoose, { Mongoose } from "mongoose";
import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueGlobalId } from "../../../domain/UniqueGlobalD";
import { ANIMAL_STATUS } from "../../../../modules/animals/domain/animal/AnimalStatus";
import { ANIMAL_SEX } from "../../../../modules/animals/domain/animal/AnimalSex";

const traitSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  value: { type: String, required: true }
});

export const contactSchema = new mongoose.Schema({
  contact_type: { type: String, required: true },
  contact_value: { type: String, required: true }
});

/**
 * @property ibgeId: IBGE's mesoregion of listed animal;
 * */
export const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: [String], required: true },
  imageExport : {type : [String], required: true},
  status: { type: String, enum: ["PENDING", "CANCELED", "DONATED", "AUTO_CANCELED"], required: true },
  sex: {type: String, enum: ANIMAL_SEX, required:true},
  donator_id: { type: mongoose.Types.ObjectId, required: true },
  specie_id: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  traits: { type: [traitSchema], required: true },
  created_at: { type: Date, required: true },
  last_modified_at: { type: Date, required: true },
  contact: { type: [contactSchema], required: true },
  views: { type: Number, required: true, default: 0 },
  clicks: { type: Number, required: true, default: 0 },
  ibgeId: {type: String, required: true}
});

//db.animals.updateMany({}, {$set: {last_modified_at: new Date()}})
export interface IAnimalPersistent {
  _id: string;
  name: string;
  image: string[];
  imageExport : string[]
  created_at: Date;
  status: ANIMAL_STATUS;
  sex: ANIMAL_SEX;
  donator_id: string;
  specie_id: string;
  description: string;
  traits: IAnimalTraitsPersistent[];
  last_modified_at: Date;
  contact: IContactPersistent[];
  views: number;
  clicks: number;
  ibgeId: string;
}

export interface IAnimalTraitsPersistent {
  _id: string;
  value: string;
}

export enum CONTACT_TYPES {
  WHATSAPP = "WHATSAPP",
  EMAIL = "EMAIL"
}

export interface IContactPersistent {
  contact_type: string;
  contact_value: string;
}

AnimalSchema.post("save", (t) => DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString() as string)));
AnimalSchema.post("findOneAndUpdate", (t) => {
  DomainEvents.dispatchEventsForAggregate(new UniqueGlobalId(t._id.toString() as string));
});

const AnimalModel = mongoose.model("animal", AnimalSchema);
export { AnimalModel };
