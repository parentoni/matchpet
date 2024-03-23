import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { Media, MediaProps, MediaPropsInput } from "./media";

/**
 * Video class 
 *
 * Responsible for handling video files
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class Video extends Media {

  private static validate(video: Blob): Either<CommonUseCaseResult.InvalidValue, null> {

    // check if guard result is true
    const guardResult = Guard.againstNullOrUndefined(video, 'video');
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    // check if blob has correct type
    if (!video.type.includes('video/')) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid video type",
        variable: "video",
        location: "Video.validate",
      }))
    }

    // check succedded.
    return right(null)
  }


  public static create(props: MediaPropsInput): Either<CommonUseCaseResult.InvalidValue, Video> {
    try {
      // check if validation result is true
      const validationResult = this.validate(props.raw);
      if (validationResult.isLeft()) {
        return left(validationResult.value)
      }

      return right(new Video({raw: props.raw, type: props.raw.type}))
    } catch (err) {
      // return error if something goes wrong
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "An error occured while creating the video",
        variable: "video",
        location: "Video.create",
      }))
    }
  }
}
