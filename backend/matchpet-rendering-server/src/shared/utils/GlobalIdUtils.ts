import mongoose from "mongoose"
import { UniqueGlobalId } from "../domain/UniqueGlobalD"

export class GlobalIdUtils {
    public static toString(id : UniqueGlobalId) {
        try {
            // Turns id to string

            const stringId = id.toValue()
            // Checks if id is valid mongo id
            if (mongoose.isValidObjectId(stringId)) {
                return id
            }

        }catch {
            return null
        }
    }
}