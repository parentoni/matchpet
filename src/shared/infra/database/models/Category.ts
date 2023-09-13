import mongoose, { Mongoose } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  svg: {type: String, required: true}
})

export interface ICategoryPersistent {
  _id: string,
  name: string,
  svg: string
}

const CategoryModel = mongoose.model('category', categorySchema)
export {CategoryModel}