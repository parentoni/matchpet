import { Media } from "../../modules/rendering/domain/media"
import { CommonUseCaseResult } from "../core/response/useCaseError"
import { Either, left, right } from "../core/result"
import { Image } from "../../modules/rendering/domain/image"
import { Video } from "../../modules/rendering/domain/video"

/**
 * 
 * @class MediaUtils
 * @classdesc Series of helpers for media manipulation.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class MediaUtils {

  /**
   * Helper function that creates a domain media object.
   * @param {Blob} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, Media>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  static createDomainMedia(props: {raw: Blob}): Either<CommonUseCaseResult.InvalidValue, Media>{
    // check if response is image
    console.log(props.raw.type)
    if (props.raw.type.includes('image/') || props.raw.type.includes('application/')) {
      const image = Image.create({raw: props.raw})
      if (image.isLeft()) {
        return left(image.value)
      }

      return right(image.value)
    }

    
    


    // check if response is video
    if (props.raw.type.includes('video/')) {
      const video = Video.create({raw: props.raw})
      if (video.isLeft()) {
        return left(video.value)
      }

      return right(video.value)
    }

    // Object dosent has type property or is not supported.
    return left(CommonUseCaseResult.InvalidValue.create({
      errorMessage: "Media type is missing or not supported.",
      variable: "MEDIA_TYPE",
      location: "HttpContentManager.download"
    }))   
  } 

  /**
   * Parses a base64 string into a Media object.
   * @param {ExternalMediaManagerDownloadProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, Media>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  static parseBase64(props: {src: string}): Either<CommonUseCaseResult.InvalidValue, Media> {
    const type = props.src.split(';')[0]?.split(':')[1]
    const base64 = props.src.split(',')[1] || ''
    if (!type || !base64) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Base64 is invalid.",
        variable: "BASE64",
        location: "HttpContentManager.parseBase64"
      }))
    }

    const buffer = Buffer.from(base64, 'base64')
    const blob = new Blob([buffer], {type})
    const media = this.createDomainMedia({raw: blob})
    return media
  }


}
