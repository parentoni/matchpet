import path from "path";
import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repository/IUserRepo";
import { CreateNewPasswordTokenUseCase } from "../createNewPasswordToken/createNewPasswordTokenUseCase";
import { SendPasswordChangeEmailDTO } from "./SendChangePasswordEmailDTO";
import { SendPasswordChangeEmailResponse } from "./SendChangePasswordEmailResponse";

import { renderFile } from "ejs";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { SendEmailUseCase } from "../../../notifications/useCase/sendEmail/sendEmailUseCase";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";
import { UserEmail } from "../../domain/userProps/userEmail";
import { UserName } from "../../domain/userProps/userName";
export class SendChangePasswordEmailUseCase implements UseCase<SendPasswordChangeEmailDTO, SendPasswordChangeEmailResponse> {
  private createNewPasswordToken: CreateNewPasswordTokenUseCase;
  private sendEmailUseCase: SendEmailUseCase;
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo, createNewPasswordTokenUseCase: CreateNewPasswordTokenUseCase, sendEmailUseCase: SendEmailUseCase) {
    this.createNewPasswordToken = createNewPasswordTokenUseCase;
    this.sendEmailUseCase = sendEmailUseCase;
    this.userRepo = userRepo;
  }

  async execute(request: SendPasswordChangeEmailDTO): Promise<SendPasswordChangeEmailResponse> {
    const guardResponse = Guard.againstNullOrUndefined(request.credential, "CREDENTIALS");
    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    //Get user by email or username
    let filter: Partial<IUserPersistant>;
    if (request.credential.includes("@")) {
      const givenEmailOrError = UserEmail.create({ value: request.credential });
      if (givenEmailOrError.isLeft()) {
        return left(givenEmailOrError.value);
      }

      filter = { email: givenEmailOrError.getRight().value };
    } else {
      const givenUserNameOrError = UserName.create({ username: request.credential });
      if (givenUserNameOrError.isLeft()) {
        return left(givenUserNameOrError.value);
      }

      filter = { username: givenUserNameOrError.getRight().value };
    }

    const user = await this.userRepo.find_one({ filter: filter });

    if (user.isLeft()) {
      return left(user.value);
    }

    const token = await this.createNewPasswordToken.execute({ user: user.value });

    if (token.isLeft()) {
      return left(token.value);
    }

    try {
      const render = await renderFile(path.join(__dirname + "../../../../../../static/emails/ejs/newPassword.ejs"), { link: token.value.url });

      const emailResponse = await this.sendEmailUseCase.execute({
        recepient: user.value.email.value,
        html_body: render,
        source: "nao-responda@matchpet.org",
        subject: "Mude a sua senha Matchpet."
      });

      if (emailResponse.isLeft()) {
        return left(emailResponse.value);
      }

      return right("ok");
    } catch (e) {
      return left(CommonUseCaseResult.UnexpectedError.create(e));
    }
  }
}
