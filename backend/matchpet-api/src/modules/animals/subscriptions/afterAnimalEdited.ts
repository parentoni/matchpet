import { differenceInDays } from "date-fns";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { AnimalEdited } from "../domain/events/AnimalEdited";
import { RenovateLastModifiedAtUseCase } from "../useCases/animals/renovateLastModifiedAt/renovateLastModifiedAtUseCase";
import { left } from "../../../shared/core/Result";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { saveInstagramImageUseCase } from "../useCases/animals/saveInstagramImage";

export class AfterAnimalEdited implements IHandle<AnimalEdited> {
  protected renovateLastModifiedAtUseCase: RenovateLastModifiedAtUseCase;
  constructor(renovateLastModifiedAtUseCase: RenovateLastModifiedAtUseCase) {
    this.setupSubscriptions();
    this.renovateLastModifiedAtUseCase = renovateLastModifiedAtUseCase;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onAnimalEdit.bind(this), AnimalEdited.name);
  }

  private async onAnimalEdit(event: AnimalEdited) {
    if (differenceInDays(event.dateTimeOccurred, event.animal.lastModifiedAt.value) >= 7) {
      const response = await this.renovateLastModifiedAtUseCase.execute({ animalId: event.animal.id.toValue() });
      if (response.isLeft()) {
        console.log("AfterAnimalEdited]: Failed to update animal stats. Error " + JSON.stringify(response.value));
      } else {
        console.log("[AfterAnimalEdited]: Success updating animal stats");
      }
      
      const res = await saveInstagramImageUseCase.execute({animalId : event.animal.id.toValue()})

      if (res.isLeft()) {
        console.log(`[AfterAnimalEdited]: Unable to execute SaveInstagramImageUseCase for animal creation. Animal Id: ${event.animal.id.toValue()}.`);
      } else {
        console.log(`[AfterAnimalEdited]: Updated donator stats. Animal Id: ${event.animal.id.toValue()}.`);
      }
      
    } else {
      console.log("[AfterAnimalEdited]: Success updating animal stats");
    }
  }
}
