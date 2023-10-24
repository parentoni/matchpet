import { Guard, GuardError } from "../../../../shared/core/Guard"
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError"
import { Either, left, right } from "../../../../shared/core/Result"
import { ValueObject } from "../../../../shared/domain/ValueObject"

export interface UserLocationProps {
  latitude: number
  longitude: number
}

export class UserLocation extends ValueObject<UserLocationProps> {
  get value() : UserLocationProps {
    return this.props
  }

  private static validate(lat:number, lon:number): Either<GuardError | CommonUseCaseResult.InvalidValue, UserLocationProps> {
    const checkResult = Guard.againstNullOrUndefinedBulk([
      {argumentName: "Latitude", argument: lat},
      {argumentName: 'Longitude', argument: lon}
    ])

    if (checkResult.isLeft()) {
      return left(checkResult.value)
    }

    if (lon >= -90 && lon <= 90 && lat >= -90 && lat <= 90 && typeof lat === 'number' && typeof lon === 'number') {
      return right({latitude: lat, longitude:lon})
    }
    return left(CommonUseCaseResult.InvalidValue.create({
      location: `${UserLocation.name}.${this.validate.name}`,
      variable: "COORDINATES",
      errorMessage: `Latitude and longitude must be values between -90 and 90 (DD format), received (${lat + ', ' + lon})`
    }))

  }

  public static create(props: UserLocationProps): Either<GuardError | CommonUseCaseResult.InvalidValue, UserLocation> {
    const checkResult = this.validate(props.latitude, props.longitude)
    if (checkResult.isLeft()) {
      return left(checkResult.value)
    }

    return right(new UserLocation(props))
  }
}