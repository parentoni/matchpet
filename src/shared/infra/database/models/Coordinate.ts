import mongoose from "mongoose";

const Coordinate = new mongoose.Schema({
  latitude: {type: Number, required: true},
  longitude: {type: Number, required: true},
})

export interface ICoordinatePersistent {
  latitude: number,
  longitude: number
}

export default Coordinate