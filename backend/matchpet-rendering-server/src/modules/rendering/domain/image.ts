import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { Media, MediaProps, MediaPropsInput } from "./media";

/**
 * Image class 
 *
 * Responsible for handling image files
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class Image extends Media {

  private static validate(image: Blob): Either<CommonUseCaseResult.InvalidValue, null> {

    // check if guard result is true
    const guardResult = Guard.againstNullOrUndefined(image, 'image');
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    // check if blob has correct type
    if (!image.type.includes('image/') && !image.type.includes('application/')) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid image type",
        variable: "image",
        location: "Image.validate",
      }))
    }

    // check succedded.
    return right(null)
  }


  public static create(props: MediaPropsInput): Either<CommonUseCaseResult.InvalidValue, Image> {
    try {
      // check if validation result is true
      const validationResult = this.validate(props.raw);
      if (validationResult.isLeft()) {
        return left(validationResult.value)
      }

      return right(new Image({raw: props.raw, type: props.raw.type}))
    } catch (err) {
      // return error if something goes wrong
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "An error occured while creating the image",
        variable: "image",
        location: "Image.create",
      }))
    }
  }

  public async toBase64(): Promise<string> {
    const buff = await this.props.raw.arrayBuffer()
    const base64 = Buffer.from(buff).toString('base64');
    return `data:${this.props.type};base64,${base64}`
  }

  public async toBuffer(): Promise<Buffer> {
    const buff = await this.props.raw.arrayBuffer()
    return Buffer.from(buff)
  }
}
