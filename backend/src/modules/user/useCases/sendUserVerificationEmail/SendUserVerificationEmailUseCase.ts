import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { SendEmailUseCase } from "../../../notifications/useCase/sendEmail/sendEmailUseCase";
import { CreateUserVerificationTokenDTO } from "../createUserVerificationToken/createUserVerificationTokenDTO";
import { CreateUserVerificationTokenUseCase } from "../createUserVerificationToken/createUserVerificationTokenUseCase";
import { SendUserVerificationEmailResponse } from "./SendUserVerificationResponse";
import * as ejs from "ejs";
import path from "path";
export class SendUserVerificationEmailUseCase implements UseCase<CreateUserVerificationTokenDTO, SendUserVerificationEmailResponse> {
  private createUserVerificationTokenUseCase: CreateUserVerificationTokenUseCase;
  sendEmailuseCase: SendEmailUseCase;

  constructor(createUserVerificationTokenUseCase: CreateUserVerificationTokenUseCase, sendEmailUseCase: SendEmailUseCase) {
    this.createUserVerificationTokenUseCase = createUserVerificationTokenUseCase;
    this.sendEmailuseCase = sendEmailUseCase;
  }

  async execute(request: CreateUserVerificationTokenDTO): Promise<SendUserVerificationEmailResponse> {
    const guardResponse = Guard.againstNullOrUndefined(request.user, "USER");
    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    const userVerificationTokenResponse = await this.createUserVerificationTokenUseCase.execute({ user: request.user });
    if (userVerificationTokenResponse.isLeft()) {
      return left(userVerificationTokenResponse.value);
    }

    try {
      const render = await ejs.renderFile(path.join(__dirname + "../../../../../../static/emails/ejs/verification.ejs"), {
        name: request.user.userName.value,
        link: userVerificationTokenResponse.value.url
      });

      const mailResponse = await this.sendEmailuseCase.execute({
        source: "nao-responda@matchpet.org",
        html_body: render,
        recepient: request.user.email.value,
        subject: "Verifique a sua conta Matchpet."
      });

      if (mailResponse.isLeft()) {
        return left(mailResponse.value);
      }

      return right("ok");
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
