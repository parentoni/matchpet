import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type AppStatsResponse = Either<CommonUseCaseResult.UnexpectedError, AppStatsResponseSuccess>;

export type AppStatsResponseSuccess = {
  in_adoption: number;
  completed_adoptions: number;
};
