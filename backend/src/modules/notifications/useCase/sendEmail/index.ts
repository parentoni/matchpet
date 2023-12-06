import { Secrets } from "../../../../config/secretsManager";
import { SendEmailUseCase } from "./sendEmailUseCase";

const sendEmailUseCase = new SendEmailUseCase(Secrets.getSecret('AWS_SES_ACCESS_KEY'), Secrets.getSecret('AWS_SES_PRIVATE_ACCESS_KEY'))

export {sendEmailUseCase}