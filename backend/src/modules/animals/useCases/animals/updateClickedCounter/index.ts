import { animalRepo } from "../../../repository";
import { UpdateClickedCounterUseCase } from "./updateClickedCounterUseCase";

const updateClickedCounterUseCase = new UpdateClickedCounterUseCase(animalRepo)

export {updateClickedCounterUseCase}