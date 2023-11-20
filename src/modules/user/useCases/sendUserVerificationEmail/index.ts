import { createUserVerificationTokenUseCase } from "../createUserVerificationToken";
import { SendUserVerificationEmailUseCase } from "./SendUserVerificationEmailUseCase";
import { sendEmailUseCase } from "../../../notifications/useCase/sendEmail";
const sendUserVerificationEmailUseCase = new SendUserVerificationEmailUseCase(createUserVerificationTokenUseCase, sendEmailUseCase)

export {sendUserVerificationEmailUseCase}