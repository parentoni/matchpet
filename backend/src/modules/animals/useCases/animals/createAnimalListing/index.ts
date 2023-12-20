import { CreateAnimalListingUseCase } from "./createAnimalListingUseCase";
import { CreateAnimalListingController } from "./createAnimalListingController";
import { specieRepo } from "../../../repository";
import { animalRepo } from "../../../repository";
import { getUserByIdUseCase } from "../../../../user/useCases/getUserByUID";

const createAnimalListingUseCase = new CreateAnimalListingUseCase(specieRepo, animalRepo, getUserByIdUseCase);
const createAnimalListingController = new CreateAnimalListingController(createAnimalListingUseCase);

export { createAnimalListingUseCase, createAnimalListingController };
