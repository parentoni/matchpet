import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export interface GetUserAnimalsStatsSuccessfulResponse {
  views: number;
  clicks: number;
}

export type GetUserAnimalsStatsResponse = Either<
  CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError,
  GetUserAnimalsStatsSuccessfulResponse
>;
