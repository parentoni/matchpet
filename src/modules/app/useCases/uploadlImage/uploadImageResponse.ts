import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type UploadAnimalImageResponse = Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, string>>;
