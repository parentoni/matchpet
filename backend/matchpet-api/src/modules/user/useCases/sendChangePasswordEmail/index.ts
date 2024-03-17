import { createNewPasswordToken } from "../createNewPasswordToken";
import { userRepo } from "../../repository";
import { sendEmailUseCase } from "../../../notifications/useCase/sendEmail";
import { SendChangePasswordEmailUseCase } from "./SendChangePasswordEmailUseCase";
import { SendChangePasswordEmailController } from "./SendChanegPasswordEmailController";

const sendChangePasswordEmailUseCase = new SendChangePasswordEmailUseCase(userRepo, createNewPasswordToken, sendEmailUseCase);
const sendChangePasswordEmailController = new SendChangePasswordEmailController(sendChangePasswordEmailUseCase);

export { sendChangePasswordEmailController };
