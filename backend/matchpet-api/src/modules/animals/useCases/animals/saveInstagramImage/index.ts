import { animalRepo } from "../../../repository";
import { SaveInstagramImageController } from "./saveInstagramImageController";
import { SaveInstagramImageUseCase } from "./saveInstagramImageUseCase";

const saveInstagramImageUseCase = new SaveInstagramImageUseCase(animalRepo)
const saveInstagramImageController = new SaveInstagramImageController(saveInstagramImageUseCase)
export {saveInstagramImageUseCase, saveInstagramImageController}