import { GetAnimaListingByIdUseCase } from "./GetAnimalListingByIdUseCase";
import { GetAnimalListingByIdController } from "./GetAnimalListingByIdController";
import { animalRepo } from "../../../repository";

const getAnimalListingByIdUseCase = new GetAnimaListingByIdUseCase(animalRepo);
const getAnimalListingByIdController = new GetAnimalListingByIdController(getAnimalListingByIdUseCase);

export { getAnimalListingByIdController };
