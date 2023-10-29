import { EditAnimalController } from "./EditAnimalController";
import { EditAnimalUseCase } from "./EditAnimalUseCase";
import { animalRepo } from "../../../repository";
import { specieRepo } from "../../../repository";

const editAnimalUseCase = new EditAnimalUseCase(animalRepo, specieRepo)
const editAnimalController = new EditAnimalController(editAnimalUseCase)

export {editAnimalController}