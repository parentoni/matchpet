import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";
import { Media } from "../../domain/media";

// Download Media Use case Response. Either error or Media-like object
export type DownloadMediaResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Media>;
