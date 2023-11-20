import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UserCreated } from "../domain/events/userCreated";
import { SendUserVerificationEmailDTO } from "../useCases/sendUserVerificationEmail/SendUserVerificationEmailDTO";
import { SendUserVerificationEmailUseCase } from "../useCases/sendUserVerificationEmail/SendUserVerificationEmailUseCase";

export class AfterUserCreated implements IHandle<UserCreated> {
  protected sendUserVerificationEmailUseCase: SendUserVerificationEmailUseCase
  constructor(sendUserVerificationEmailUseCase: SendUserVerificationEmailUseCase) {
    this.setupSubscriptions()
    this.sendUserVerificationEmailUseCase = sendUserVerificationEmailUseCase
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreation.bind(this), UserCreated.name)
  }

  private async onUserCreation  (e: UserCreated) {
    const response = await this.sendUserVerificationEmailUseCase.execute({user:e.user})
    if (response.isLeft()) {
      console.log(`[AfterUserCreated]: Unable to execute SendUserVerificationEmail for ${e.user.email.value}. `);
    }

    console.log(`[AfterUserCreated]: Success executing SendUserVerificationEmail for ${e.user.email.value}. `);

  }
}