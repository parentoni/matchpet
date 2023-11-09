import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UserLogin } from "../domain/events/userLogin";
import { LogUserActivityUseCase } from "../useCases/logUserActivity/logUserActivityUseCase";

export class AfterUserLogIn implements IHandle<UserLogin> {
  protected logUserActivityUseCase: LogUserActivityUseCase
  constructor(logUserActivity: LogUserActivityUseCase) {
    this.setupSubscriptions()
    this.logUserActivityUseCase = logUserActivity
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserLogin.bind(this), UserLogin.name)
  }

  private async onUserLogin(event: UserLogin) {
    const response = await this.logUserActivityUseCase.execute({ uid: event.user.id.toValue(), date: event.dateTimeOccurred})
    if (response.isLeft()) {
      console.log(`[AfterUserLogIn]: Unable to execute LogUserActivity for ${event.user.email.value}. `);
    }

    console.log(`[AfterUserLogIn]: Success executing LogUserActivity for ${event.user.email.value}. `);

  }
}