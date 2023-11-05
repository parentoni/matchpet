import { EditAnimalController } from "./EditAnimalController";
import { EditAnimalUseCase } from "./EditAnimalUseCase";
import { animalRepo } from "../../../repository";
import { specieRepo } from "../../../repository";
import { updateUserStatsUseCase } from "../../../../user/useCases/updateUserStats";
const editAnimalUseCase = new EditAnimalUseCase(animalRepo, specieRepo, updateUserStatsUseCase)
const editAnimalController = new EditAnimalController(editAnimalUseCase)

export {editAnimalController}