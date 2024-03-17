import { animalRepo } from "../../../repository";
import { DeactivateUnactiveAnimalsController } from "./deactivateUnactiveAnimalsController";
import { DeactivateUnactiveAnimalsUseCase } from "./deactivateUnactiveAnimalsUseCase";
import { getUserByIdUseCase } from "../../../../user/useCases/getUserByUID";
import { sendEmailUseCase } from "../../../../notifications/useCase/sendEmail";
const deactivateUnactiveAnimalsUseCase = new DeactivateUnactiveAnimalsUseCase(getUserByIdUseCase, animalRepo, sendEmailUseCase);
const deactivateUnactiveAnimalsController = new DeactivateUnactiveAnimalsController(deactivateUnactiveAnimalsUseCase);
export { deactivateUnactiveAnimalsController };
