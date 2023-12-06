import { sendEmailUseCase } from "../../../../notifications/useCase/sendEmail";
import { getUserByIdUseCase } from "../../../../user/useCases/getUserByUID";
import { animalRepo } from "../../../repository";
import { NotificateRenovationPossibilityController } from "./NotificateRenovationPossibilityController";
import { NotificateRenovationPossibilityUseCase } from "./NotificateRenovationPossibilityUseCase";

const notificateRenovationPossibilityUseCase = new NotificateRenovationPossibilityUseCase(animalRepo, getUserByIdUseCase, sendEmailUseCase)
const notificateRenovationPossibilityController = new NotificateRenovationPossibilityController(notificateRenovationPossibilityUseCase)

export { notificateRenovationPossibilityUseCase, notificateRenovationPossibilityController }