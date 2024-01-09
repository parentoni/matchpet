import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface UserImageProps {
  image: ValidUrl;
}

export class UserImage extends ValueObject<UserImageProps> {
  get value(): string {
    return this.props.image.value;
  }

  private static validate(url: string): Either<GuardError, ValidUrl> {
    const guard = Guard.againstNullOrUndefined(url, "IMAGE_URL");

    if (guard.isLeft()) {
      return left(guard.value);
    }

    const validUrlResponse = ValidUrl.create({ value: url });
    if (validUrlResponse.isLeft()) {
      return left(validUrlResponse.value);
    }

    return right(validUrlResponse.value);
  }

  public static create({ image }: { image: string }): Either<GuardError, UserImage> {
    const validateResult = this.validate(image);

    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(new UserImage({ image: validateResult.value }));
  }
}
