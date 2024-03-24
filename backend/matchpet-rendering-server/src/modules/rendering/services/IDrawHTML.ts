import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError"
import { Either } from "../../../shared/core/result"
import { HTML } from "../domain/HTML"
import { RENDER_IMAGE_MIME_TYPE } from "../useCases/renderImage/renderImageUseCase"
import { Image } from "../domain/image"

/**
 * Interface that should handle html rendering.
 *
 */
export interface DrawImageProps {
  html: HTML,
  width: number,
  height: number,
  type: RENDER_IMAGE_MIME_TYPE,
}

export type DrawImageResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Image>>
export interface IDrawHTML {
  image(props: DrawImageProps): DrawImageResponse
}

