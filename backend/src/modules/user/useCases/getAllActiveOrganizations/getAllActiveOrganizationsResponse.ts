import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type GetAllActiveOrganizationsResponse = Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, IUserPersistant[]>;
