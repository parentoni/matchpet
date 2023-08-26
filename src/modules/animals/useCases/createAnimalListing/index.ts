import { CreateAnimalListingUseCase } from "./createAnimalListingUseCase";
import { CreateAnimalListingController } from "./createAnimalListingController";
import { specieRepo } from "../../repository";

const createAnimalListingUseCase = new CreateAnimalListingUseCase(specieRepo);
const createAnimalListingController = new CreateAnimalListingController(createAnimalListingUseCase);

export { createAnimalListingUseCase, createAnimalListingController };
