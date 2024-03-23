import { AxiosInstance } from "axios";
import { ExternalMediaManagerDownloadProps, ExternalMediaManagerDownloadResponse, IExternalMediaManager } from "../IContentManager";
import { Either, left, right } from "../../../../shared/core/result";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Image } from "../../domain/image";
import { Video } from "../../domain/video";
import { Media } from "../../domain/media";
import { MediaUtils } from "../../../../shared/utils/MediaUtils";

/**
 * 
 * @class HttpContentManager
 * @classdesc Manages the download of external media.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */

export class HttpContentManager implements IExternalMediaManager {

  /**
   * todo: maybe this function should be in a helper class.
   * @param {ExternalMediaManagerDownloadProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, Media>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async download(props: ExternalMediaManagerDownloadProps): ExternalMediaManagerDownloadResponse {
    try {
      // Download the media
      const response = await fetch(props.src, {method: 'GET'})
      const mediaType = response.headers.get('content-type') || ''

      //check if response is ok
      if (!response.ok) {
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Media could not be downloaded.",
          variable: "MEDIA",
          location: "HttpContentManager.download"
        }))
      }

      // defines file as blob
      const blob = await response.blob()

      // create domain media object
      const media = MediaUtils.createDomainMedia({raw: blob})
      return media
       
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }
  
}
