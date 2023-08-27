import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { AnimalModel } from "../../../../shared/infra/database/models/Animal";
import { Animal } from "../../domain/Animal";
import { AnimalMapper } from "../../mappers/AnimalMapper";
import { IAnimalRepo } from "../IAnimalRepo";

export class AnimalRepo implements IAnimalRepo {
    async save(animal: Animal): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
        const animalPersistent = AnimalMapper.toPersistent(animal)
        if (animalPersistent.isLeft()) {
            return left(animalPersistent.value)
        }
        const exists = await AnimalModel.exists({_id: animal.id.toValue()})

        if (!!exists) {
            await AnimalModel.findByIdAndUpdate(animal.id.toValue(), animalPersistent.value)
            return right(null)
        }

        await AnimalModel.create(animalPersistent.value)
        return right(null)

    }
    
}