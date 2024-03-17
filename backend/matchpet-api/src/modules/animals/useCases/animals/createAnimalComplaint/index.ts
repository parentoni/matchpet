import { CreateAnimalComplaintController } from "./createAnimalComplaintController";
import { CreateAnimalComplaintUseCase } from "./createAnimalComplaintUseCase";
import { animalRepo } from "../../../repository";
import { sendEmailUseCase } from "../../../../notifications/useCase/sendEmail";

const createAnimalComplaintUseCase = new CreateAnimalComplaintUseCase(animalRepo, sendEmailUseCase);
const createAnimalComplaintController = new CreateAnimalComplaintController(createAnimalComplaintUseCase);

export { createAnimalComplaintController };
