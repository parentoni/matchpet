import { animalRepo } from "../../../repository";
import { UpdateViewCounterUseCase } from "./UpdateViewCounterUseCase";

const updateViewCounterUseCase = new UpdateViewCounterUseCase(animalRepo);

export { updateViewCounterUseCase };
