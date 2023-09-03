import mongoose from "mongoose";

const traitSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  value: { type: String, required: true }
});

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  created_at: { type: Date, required: true },
  status: { type: String, required: true },
  donator_id: { type: mongoose.Types.ObjectId, required: true },
  specie_id: { type: mongoose.Types.ObjectId, required: true },

  traits: { type: [traitSchema], required: true }
});

export interface IAnimalPersistent {
  _id: string;
  name: string;
  age: number;
  image: string;
  created_at: Date;
  status: string;

  donator_id: string;
  specie_id: string;

  traits: IAnimalTraitsPersistent[];
}

export interface IAnimalTraitsPersistent {
  _id: string;
  value: string;
}

const AnimalModel = mongoose.model("animal", AnimalSchema);
export { AnimalModel };
