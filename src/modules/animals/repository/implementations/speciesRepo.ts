import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ISpecieTraitPersistent, specieModel } from "../../../../shared/infra/database/models/Specie";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";
import { Specie } from "../../domain/Specie";
import { SpeciesMapper } from "../../mappers/SpeciesMapper";
import { ISpecieRepo } from "../ISpeciesRepo";

export class SpecieRepo implements ISpecieRepo {
  // Por mais que a regra de inversao exiga uma injecao do modelo, por usarmos MONGO,
  // q nao é SQL, nao faz sentido fazer a inversao do modelo MONGO, visto que qualquer mudanca no banco de dados exigira
  // uma mudanca geral.
  async save(specie: Specie): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    const exists = await specieModel.exists({ _id: specie.id.toValue() });
    const specieInPersistent = SpeciesMapper.toPersistent(specie);

    if (specieInPersistent.isLeft()) {
      return left(specieInPersistent.value);
    }

    if (!!exists) {
      await specieModel.findByIdAndUpdate(specie.id.toValue(), specieInPersistent.value);
      return right(null);
    }

    await specieModel.create(specieInPersistent.value);
    return right(null);
  }

  async all(): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Specie[]>> {
    try {
      const domainSpecieArray: Specie[] = [];
      const persistentSpecieArray = await specieModel.find();

      for (const persistentSpecie of persistentSpecieArray) {
        const specieMapperResult = SpeciesMapper.toDomain(persistentSpecie.toObject());
        if (specieMapperResult.isLeft()) {
          return left(specieMapperResult.value);
        }

        domainSpecieArray.push(specieMapperResult.value);
      }
      return right(domainSpecieArray);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  async findById(id: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue | GuardError, Specie>> {
    try {
      const result = await specieModel.findById(id);

      if (!result) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${SpecieRepo.name}.${this.findById.name}`,
            errorMessage: "There was no species found with given id.",
            variable: "ID"
          })
        );
      }

      const mapperResult = SpeciesMapper.toDomain(result.toObject());
      if (mapperResult.isLeft()) {
        return left(mapperResult.value);
      }

      return right(mapperResult.value);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
