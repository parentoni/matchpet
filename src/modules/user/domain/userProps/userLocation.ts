import { Guard, GuardError } from "../../../../shared/core/Guard";
import { Location } from "../../../../shared/core/Location";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import geohash from 'ngeohash'

export interface UserLocationCreateProps {
  coords: [number, number]
}

export interface UserLocationProps {
  geoHash: string,
  coords: [number, number]
}

export class UserLocation extends ValueObject<UserLocationProps> {
 get value(): any {
   throw new Error("Method not implemented.");
 }
 
 private static validate (props: UserLocationCreateProps): Either<GuardError, Location.GeoJsonPoint> {
  const guard = Guard.againstNullOrUndefined(props.coords, "USER_COORDS")
  if (guard.isLeft()) {
    return left(guard.value)
  }

  const point = Location.GeoJsonPoint.create({coordinates: props.coords})
  if (point.isLeft()) {
    return left(point.value)
  }

  return right(point.value)
 }

 public static create(props: UserLocationCreateProps) {
  const validateResult = this.validate(props)
  if (validateResult.isLeft()) {
    return left(validateResult.value)
  }

  const geoHadhedCoordinates = geohash.encode(validateResult.value.latitude, validateResult.value.longitude)

  console.log(geoHadhedCoordinates)
  // const geoHash = GeoHash.encode(validateResult.value.latitude, validateResult.value.longitude)
  // console.log(geoHash)
 }
}

