import { GuardError } from "../../../../shared/core/Guard";
import { Either } from "../../../../shared/core/Result";
import { User } from "../../domain/user";

export type UpdateUserStatsResponse = Either<GuardError, User>;
