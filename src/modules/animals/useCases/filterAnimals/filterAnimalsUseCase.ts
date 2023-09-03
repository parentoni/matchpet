import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../repository/IAnimalRepo";
import { FILTER_MODES, FilterAnimalsDTO, FilterObject } from "./filterAnimalsDTO";
import { FilterAnimalsUseCaseResponse } from "./filterAnimalsResponse";

export class FilterAnimalsUseCase implements UseCase<FilterAnimalsDTO, FilterAnimalsUseCaseResponse> {

    protected animalRepo: IAnimalRepo;
    constructor (animalRepo: IAnimalRepo) {
        this.animalRepo = animalRepo
    }

    async execute(request: FilterAnimalsDTO): Promise<FilterAnimalsUseCaseResponse> {
        const guardResponse = Guard.againstNullOrUndefinedBulk([
            {argument: request.filter, argumentName: "FILTER"},
            {argument: request.page, argumentName: "PAGE"}
        ])

        if (guardResponse.isLeft()) {
            return left(guardResponse.value)
        }

        const treatedFilters: FilterObject[] = []


        // Treat the filters mode for animalRepo
        for (const untreatedFilter of request.filter) {
            
            if (Object.values(FILTER_MODES).includes(untreatedFilter.mode)) {
                treatedFilters.push({...untreatedFilter, mode: untreatedFilter.mode as FILTER_MODES})
            }
        }

        const result = await this.animalRepo.findBulk(treatedFilters, request.page * 30, 30)
        if (result.isLeft()) {
            return left(result.value)
        }

        return right(result.value)
    }

}