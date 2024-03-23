import { AxiosInstance } from "axios";
import { ExternalMediaManagerDownloadProps, ExternalMediaManagerDownloadResponse, IExternalMediaManager } from "../IContentManager";
import { Either, left, right } from "../../../../shared/core/result";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Image } from "../../domain/image";
import { Video } from "../../domain/video";

/**
 * 
 * @class HttpContentManager
 * @classdesc Manages the download of external media.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class HttpContentManager implements IExternalMediaManager {
  client: AxiosInstance;
  /**
   * Injects the axios client to be used for requests.
   * @constructor
   * @param {AxiosInstance} client - The Axios instance to use for downloading.
   */
  constructor(client: AxiosInstance) {
    this.client = client;

  }

  async download(props: ExternalMediaManagerDownloadProps): ExternalMediaManagerDownloadResponse {
    try {
      // Download the media
      const response = await this.client.get(props.src)
      const mediaType = response.headers['content-type']

      // defines file as blob
      const buffer = Buffer.from(response.data, 'base64')
      const blob = new Blob([buffer], {type: mediaType})
      
      // Create media response 

      // check if response is image
      if (mediaType.includes('image/')) {
        const image = Image.create({raw: blob})
        if (image.isLeft()) {
          return left(image.value)
        }

        return right(image.value)
      }

      // check if response is video
      if (mediaType.includes('video/')) {
        const video = Video.create({raw: blob})
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
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }
}
