import { ValueObject } from "../domain/ValueObject";
import { Guard, GuardError } from "./Guard";
import { CommonUseCaseResult } from "./response/useCaseError";
import { Either, left, right } from "./result";

export interface ValidUrlProps {
  value: string;
}

export type ValidUrlCreateResponse = Either<GuardError | CommonUseCaseResult.InvalidValue, ValidUrl>;
export class ValidUrl extends ValueObject<ValidUrlProps> {
  get value(): string {
    return this.props.value;
  }

  public static create(props: ValidUrlProps): ValidUrlCreateResponse {
    const guardResult = Guard.againstNullOrUndefined(props.value, "URL");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    try {
      //Check the url
      new URL(props.value);

      return right(new ValidUrl(props));
    } catch (error) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${ValidUrl.name}.${ValidUrl.create.name}`,
          errorMessage: "Invalid url",
          variable: "URL"
        })
      );
    }
  }
}
