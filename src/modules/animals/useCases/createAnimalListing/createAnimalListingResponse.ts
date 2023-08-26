import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { Animal } from "../../domain/Animal";

export type CreateAnimalListingResponse = Either<CommonUseCaseResult.InvalidValue | GuardError, Animal>;
