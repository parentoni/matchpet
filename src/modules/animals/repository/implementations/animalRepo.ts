import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { AnimalModel } from "../../../../shared/infra/database/models/Animal";
import { Animal } from "../../domain/Animal";
import { ANIMAL_STATUS } from "../../domain/animal/AnimalStatus";
import { AnimalMapper } from "../../mappers/AnimalMapper";
import { FILTER_MODES, FilterObject } from "../../useCases/animals/filterAnimals/filterAnimalsDTO";
import { AnimalFindProps, IAnimalRepo } from "../IAnimalRepo";
import { Location } from "../../../../shared/core/Location";
import mongoose, { PipelineStage, mongo } from "mongoose";

export type DBFilter = Record<string, Record<string, any>>;

export class AnimalRepo implements IAnimalRepo {
  
  async save(animal: Animal): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    const animalPersistent = AnimalMapper.toPersistent(animal);
    if (animalPersistent.isLeft()) {
      return left(animalPersistent.value);
    }
    const exists = await AnimalModel.exists({ _id: animal.id.toValue() });

    if (!!exists) {
      await AnimalModel.findOneAndUpdate({_id: animal.id.toValue()}, animalPersistent.value);
      return right(null);
    }

    await AnimalModel.create(animalPersistent.value);
    return right(null);
  }

  async findById(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, Animal>> {
    try {
      const result = await AnimalModel.findById(id);

      if (!result) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${AnimalModel.name}.${this.findById.name}`,
            errorMessage: "There was no animals found with given id.",
            variable: "ID"
          })
        );
      }

      const mapperResult = AnimalMapper.toDomain(result.toObject());
      if (mapperResult.isLeft()) {
        return left(mapperResult.value);
      }

      return right(mapperResult.value);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async findSimilar(
    excludeId: string,
    specieId: string,
    searchValue: string[]
  ): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Animal[]>> {
    try {
      const results = await AnimalModel.aggregate([
        // First phase, filter all available same specie animals
        { $match: { specie_id: specieId, status: "PENDING", _id: { $ne: excludeId } } },
        //Second phase, sample 1000 random animals for performance resasons
        { $sample: { size: 1000 } },

        // Third phase, unwind traits
        { $unwind: { path: "$traits" } },

        //todo: add a similarity score based on trait importance
        // Fourth phase, add score based on trait
        {
          $addFields: {
            score: { $cond: { if: { $in: ["$traits.value", searchValue] }, then: 1, else: 0 } }
          }
        },

        // Fifth phase, recompile
        {
          $group: {
            _id: "$_id",
            score: { $sum: "$score" },
            name: { $first: "$name" },
            age: { $first: "$age" },
            image: { $first: "$image" },
            created_at: { $first: "created_at" },
            status: { $first: "$status" },
            donator_id: { $first: "$donator_id" },
            specie_id: { $first: "$specie_id" },
            traits: { $push: "$traits" }
          }
        },

        //Last phase, limit and sort by score
        { $sort: { score: -1 } },
        { $limit: 20 }
      ]);

      const animalArray: Animal[] = [];
      for (const result of results) {
        const mapperReult = AnimalMapper.toDomain(result);
        if (mapperReult.isLeft()) {
          return left(mapperReult.value);
        }

        animalArray.push(mapperReult.value);
      }

      return right(animalArray);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async findBulk(
    filter: FilterObject[],
    skip: number,
    limit: number
  ): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, { animals: Animal[]; count: number }>> {
    try {
      const dbFilter: DBFilter[] = [];
      for (const ind_filter of filter) {
        const comparation: Record<string, any> = {};
        const filter: Record<string, any> = {};

        comparation[ind_filter.mode] = ind_filter.comparation_value;
        filter[ind_filter.key] = comparation;
        dbFilter.push(filter);
      }

      const result = await AnimalModel.find(dbFilter.length > 0 ? { $and: dbFilter } : {})
        .limit(limit)
        .skip(skip);
      const count = await AnimalModel.find(dbFilter.length > 0 ? { $and: dbFilter } : {}).count();

      const animalArray: Animal[] = [];

      for (const persistenceAnimal of result) {
        const mapperResult = AnimalMapper.toDomain(persistenceAnimal.toObject());
        if (mapperResult.isRight()) {
          animalArray.push(mapperResult.value);
        }
      }
      return right({ animals: animalArray, count: count });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  //Todo: better filter, clean this || documentate.
  async geoFind(props: AnimalFindProps): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, { animals: Animal[]; count: number }>> {
    const filters: PipelineStage[] = [];
    const dbFilter: DBFilter[] = [];
    const idFilter: DBFilter[] = [];

    const objectIdFields = ["donator_id", "specie_id"];

    for (const ind_filter of props.filterObject) {
      const comparation: Record<string, any> = {};
      const filter: Record<string, any> = {};

      if (objectIdFields.includes(ind_filter.key)) {
        ind_filter.comparation_value = { $toObjectId: ind_filter.comparation_value };
        filter[ind_filter.mode] = ["$" + ind_filter.key, ind_filter.comparation_value];
        idFilter.push(filter);
      } else {
        comparation[ind_filter.mode] = ind_filter.comparation_value;
        filter[ind_filter.key] = comparation;
        dbFilter.push(filter);
      }
    }

    if (dbFilter.length > 0) {
      filters.push({ $match: { $and: dbFilter } });
    }

    if (idFilter.length > 0) {
      filters.push({ $match: { $expr: { $and: idFilter } } });
    }

    //If location push location filters

    if (props.location) {
      filters.push(
        ...[
          {
            $lookup: {
              from: "users",
              localField: "donator_id",
              foreignField: "_id",
              as: "user_data"
            }
          },
          {
            $match: {
              "user_data.location": {
                $geoWithin: {
                  $geometry: {
                    type: "Polygon",
                    coordinates: props.location.coordinates
                  }
                }
              }
            }
          }
        ]
      );
    }

    const countFilter = structuredClone(filters);
    filters.push({
      $sort: {
        created_at: -1
      }
    });

    filters.push({ $skip: props.skip }, { $limit: props.limit });

    const animalArray: Animal[] = [];
    try {
      const result = await AnimalModel.aggregate(filters);
      const count = result.length > 0 ? await AnimalModel.aggregate(countFilter).count("count") : "";

      for (const persistenceAnimal of result) {
        const mapperResult = AnimalMapper.toDomain(persistenceAnimal);
        if (mapperResult.isRight()) {
          animalArray.push(mapperResult.value);
        }
      }

      return right({ animals: animalArray, count: result.length > 0 ? count[0].count : 0 });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async countUnactive(date: Date, unactiveDays: number): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, { _id: string; animals: Animal[]}[]>> {

    const threshold = new Date(date.getTime())
    threshold.setDate(threshold.getDate() - unactiveDays)

    try {
      const result = await  AnimalModel.aggregate([
        {$match: { last_modified_at: {$lt: threshold}}},
        {$group: {_id: {$toString:"$donator_id"}, animals: {$push: {$mergeObjects: "$$ROOT"}}}}
      ])

      for (const user of result) {
        const mapperResponse = AnimalMapper.toDomainBulk(user.animals)
        if (mapperResponse.isLeft()) {
          return left(mapperResponse.value)
        }

        user.animals = mapperResponse.value
      }

      return right(result)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

}

