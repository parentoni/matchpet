import { Guard } from "../../../../../shared/core/Guard";
import { Location } from "../../../../../shared/core/Location";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { AnimalMapper } from "../../../mappers/AnimalMapper";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { FILTER_MODES, FilterAnimalsDTO, FilterObject } from "./filterAnimalsDTO";
import { FilterAnimalsUseCaseResponse } from "./filterAnimalsResponse";

export class FilterAnimalsUseCase implements UseCase<FilterAnimalsDTO, FilterAnimalsUseCaseResponse> {
  protected animalRepo: IAnimalRepo;
  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: FilterAnimalsDTO): Promise<FilterAnimalsUseCaseResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: request.filter, argumentName: "FILTER" },
      { argument: request.page, argumentName: "PAGE" }
    ]);

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
      if (Object.values(FILTER_MODES).includes(untreatedFilter.mode)) {
        treatedFilters.push({ ...untreatedFilter, mode: untreatedFilter.mode as FILTER_MODES });
      }
    }

    const result = await this.animalRepo.geoFind({
      location: polygon,
      filterObject: treatedFilters,
      skip: request.page * 50,
      limit: 50
    });
    if (result.isLeft()) {
      return left(result.value);
    }

    const persistentValues: IAnimalPersistent[] = [];
    for (const value of result.value.animals) {
      const mapperResult = AnimalMapper.toPersistent(value);
      if (mapperResult.isLeft()) {
        return left(mapperResult.value);
      }

      persistentValues.push(mapperResult.value);
    }
    return right({ animals: persistentValues, count: result.value.count });
  }
}
