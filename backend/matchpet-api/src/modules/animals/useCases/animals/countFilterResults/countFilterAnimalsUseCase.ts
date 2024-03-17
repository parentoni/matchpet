import { Guard } from "../../../../../shared/core/Guard";
import { Location } from "../../../../../shared/core/Location";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { AnimalMapper } from "../../../mappers/AnimalMapper";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { FILTER_MODES, FilterAnimalsDTO, FilterObject } from "../filterAnimals/filterAnimalsDTO";
import { FilterAnimalsUseCaseResponse } from "../filterAnimals/filterAnimalsResponse";
import { UpdateViewCounterUseCase } from "../updateVIewCounter/UpdateViewCounterUseCase";
import { CountFilterAnimalsDTO } from "./countFilterAnimalsDTO";
import { CountFilterAnimalsUseCaseResponse } from "./countFilterAnimalsResponse";

export class CountFilterAnimalsUseCase implements UseCase<CountFilterAnimalsDTO, CountFilterAnimalsUseCaseResponse> {
  protected animalRepo: IAnimalRepo;

  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: CountFilterAnimalsDTO): Promise<CountFilterAnimalsUseCaseResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([{ argument: request.filter, argumentName: "FILTER" }]);

    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    let polygon: Location.GeoJsonPolygon | undefined = undefined;

    if (request.coordinates) {
      const response = Location.GeoJsonPolygon.create({
        coordinates: request.coordinates
      });
      if (response.isLeft()) {
        return left(response.value);
      }

      polygon = response.value;
    }

    const treatedFilters: FilterObject[] = [];

    // Treat the filters mode for animalRepo
    for (const untreatedFilter of request.filter) {
      if (untreatedFilter.key === "last_modified_at" || untreatedFilter.key === "created_at") {
        treatedFilters.push({
          ...untreatedFilter,
          comparation_value: new Date(untreatedFilter.comparation_value),
          mode: untreatedFilter.mode as FILTER_MODES
        });
      } else if (Object.values(FILTER_MODES).includes(untreatedFilter.mode)) {
        treatedFilters.push({ ...untreatedFilter, mode: untreatedFilter.mode as FILTER_MODES });
      }
    }

    const result = await this.animalRepo.geoCount({
      location: polygon,
      filterObject: treatedFilters
    });
    if (result.isLeft()) {
      return left(result.value);
    }

    return right({ count: result.value });
  }
}
