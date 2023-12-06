import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export enum ANIMAL_STATUS {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DONATED = "DONATED"
}

export class AnimalStatus extends ValueObject<{ status: ANIMAL_STATUS }> {
  get value(): ANIMAL_STATUS {
    return this.props.status;
  }

  private static validate(status: string): Either<GuardError, ANIMAL_STATUS> {
    const guard = Guard.againstNullOrUndefined(status, "ANIMAL_STATUS");
    if (guard.isLeft()) {
      return left(guard.value);
    }

    if (Object.values(ANIMAL_STATUS).includes(status as ANIMAL_STATUS)) {
      return right(status as ANIMAL_STATUS);
    }

    return left(
      CommonUseCaseResult.InvalidValue.create({
        location: `${AnimalStatus.name}.${this.validate.name}`,
        errorMessage: "Non valid animal status",
        variable: "ANIMAL_STATUS"
      })
    );
  }

  public static create(status: string): Either<GuardError, AnimalStatus> {
    const validateResponse = this.validate(status);
    if (validateResponse.isLeft()) {
      return left(validateResponse.value);
    }

    return right(new AnimalStatus({ status: validateResponse.value }));
  }
}
