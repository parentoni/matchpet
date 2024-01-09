import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { AnimalClicked } from "../domain/events/AnimalClicked";
import { UpdateClickedCounterUseCase } from "../useCases/animals/updateClickedCounter/updateClickedCounterUseCase";

export class AfterAnimalClicked implements IHandle<AnimalClicked> {
  updateClickedCounterUseCase: UpdateClickedCounterUseCase;

  constructor(updateClickedCounterUseCase: UpdateClickedCounterUseCase) {
    this.setupSubscriptions();
    this.updateClickedCounterUseCase = updateClickedCounterUseCase;
  }
  setupSubscriptions(): void {
    DomainEvents.register(this.onAnimalClicked.bind(this), AnimalClicked.name);
  }

  private async onAnimalClicked(event: AnimalClicked): Promise<void> {
    const response = await this.updateClickedCounterUseCase.execute({
      animal: event.animal
    });
    if (response.isLeft()) {
      console.log(`[AfterAnimalClikcked]: Unable to execute updateClickedCounterUseCase for animal click. AnimalId: ${event.animal.id.toValue}.`);
    } else {
      console.log(`[AfterAnimalCreated]: Updated animal click stats. animals Id: ${event.animal.id.toValue()}.`);
    }
  }
}
