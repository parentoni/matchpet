import { CreateAnimalListingUseCase } from "./createAnimalListingUseCase";
import { CreateAnimalListingController } from "./createAnimalListingController";
import { specieRepo } from "../../repository";
import { animalRepo } from "../../repository";
const createAnimalListingUseCase = new CreateAnimalListingUseCase(specieRepo, animalRepo);
const createAnimalListingController = new CreateAnimalListingController(createAnimalListingUseCase);

export { createAnimalListingUseCase, createAnimalListingController };
