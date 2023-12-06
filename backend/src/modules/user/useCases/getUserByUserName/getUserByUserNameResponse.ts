import { GuardError } from "../../../../shared/core/Guard";
import { Either } from "../../../../shared/core/Result";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type GetUserByUserNameResponse = Either<GuardError, IUserPersistant>