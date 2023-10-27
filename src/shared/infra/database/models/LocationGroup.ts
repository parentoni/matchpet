import mongoose from "mongoose";
import { GeoJsonPoLygonSchema } from "./Coordinate";

const locationGroupSchema = new mongoose.Schema({
  name: { type: String, requied: true },
  location: { type: GeoJsonPoLygonSchema, required: true }
});

const LocationGroupModel = mongoose.model("location_groups", locationGroupSchema);
export { LocationGroupModel };
