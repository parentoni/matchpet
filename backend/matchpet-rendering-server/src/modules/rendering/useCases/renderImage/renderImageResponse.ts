import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";
import { Image } from "../../domain/image";

export type RenderImageResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Image>
