import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UpdateUserStatsUseCase } from "../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { ANIMAL_STATUS } from "../domain/animal/AnimalStatus";
import { AnimalStatusChanged } from "../domain/events/AnimalStatusChanged";

export class AfterAnimalStatusChanged implements IHandle<AnimalStatusChanged> {
  private updateUserStatsUseCase: UpdateUserStatsUseCase;

  constructor(updateUserStatsUseCase: UpdateUserStatsUseCase) {
    this.updateUserStatsUseCase = updateUserStatsUseCase;
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onAnimalStatusChanged.bind(this), AnimalStatusChanged.name);
  }

  private async onAnimalStatusChanged(event: AnimalStatusChanged): Promise<void> {
    const response = await this.updateUserStatsUseCase.execute({
      userId: event.animal.donatorId.toValue(),
      addInAdoption: event.oldStatus === event.newStatus ? 0 : event.oldStatus === ANIMAL_STATUS.PENDING ? -1 : event.newStatus === ANIMAL_STATUS.PENDING? 1:0,
      addCompletedAdoptions: event.oldStatus === event.newStatus ? 0 : event.oldStatus === ANIMAL_STATUS.DONATED? -1: event.newStatus === ANIMAL_STATUS.DONATED? 1: 0
    });

    if (response.isLeft()) {
      console.log(`[AfterAnimalStatusChanged]: Unable to execute UpdateUserStats. UserId: ${event.animal.donatorId.toValue()}.`);
    } else {
      console.log(`[AfterAnimalStatusChanged: Succes executing UpdateUserStats. UserId: ${event.animal.donatorId.toValue()}.`);
    }
  }
}
