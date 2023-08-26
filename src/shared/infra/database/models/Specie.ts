import mongoose, { Mongoose } from "mongoose";

const specieTrait = new mongoose.Schema({
    name: {type: String, required:true},
    svg: {type:String, required:true},
    optional: {type: Boolean, required:true},
    category: {type: String, required: true},
    options: {type: [String], required:true},

})

const specieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    traits: {type: [specieTrait], default: []}
})

export interface ISpeciePersistent {
    _id: string,
    name: string,
    traits: ISpecieTraitPersistent[]
}

export interface ISpecieTraitPersistent {
    _id: string,
    name: string,
    svg: string,
    optional: boolean,
    category: string,
    options: string[]
}

const specieModel= mongoose.model("specie", specieSchema)

export {specieModel}