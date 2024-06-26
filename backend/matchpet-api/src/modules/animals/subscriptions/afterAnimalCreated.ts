import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UpdateUserStatsUseCase } from "../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { AnimalCreated } from "../domain/events/AnimalCreated";
import { saveInstagramImageUseCase } from "../useCases/animals/saveInstagramImage";

export class AfterAnimalCreated implements IHandle<AnimalCreated> {
  private updateUserStatsUseCase: UpdateUserStatsUseCase;

  constructor(updateUserStatsUseCase: UpdateUserStatsUseCase) {
    this.setupSubscriptions();
    this.updateUserStatsUseCase = updateUserStatsUseCase;
  }
  setupSubscriptions(): void {
    DomainEvents.register(this.onAnimalCreated.bind(this), AnimalCreated.name);
  }

  private async onAnimalCreated(event: AnimalCreated): Promise<void> {
    const response = await this.updateUserStatsUseCase.execute({
      userId: event.animal.donatorId.toValue(),
      addInAdoption: 1,
      addCompletedAdoptions: 0
    });

    if (response.isLeft()) {
      console.log(`[AfterAnimalCreated]: Unable to execute UpdateUserStats for animal creation. UserId: ${event.animal.donatorId.toValue()}.`);
    } else {
      console.log(`[AfterAnimalCreated]: Updated donator stats. Donator Id: ${event.animal.donatorId.toValue()}.`);
    }

    const res = await saveInstagramImageUseCase.execute({animalId : event.animal.id.toValue()})

    if (res.isLeft()) {
      console.log(`[AfterAnimalCreated]: Unable to execute SaveInstagramImageUseCase for animal creation. Animal Id: ${event.animal.id.toValue()}.`);
    } else {
      console.log(`[AfterAnimalCreated]: Updated donator stats. Animal Id: ${event.animal.id.toValue()}.`);
    }
  }
}
