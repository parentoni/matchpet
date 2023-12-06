import GeoJSON, { Polygon, Point } from "geojson";
import { ValueObject, ValueObjectParams } from "../domain/ValueObject";
import { Guard, GuardError } from "./Guard";
import { Either, left, right } from "./Result";

export type TreatedGeoJson<T> = Omit<T, "type">;

export namespace Location {
  export class GeoJsonPolygon extends ValueObject<Polygon> {
    get value(): Polygon {
      return this.props;
    }

    get coordinates(): GeoJSON.Position[][] {
      return this.props.coordinates;
    }

    public static create(p: TreatedGeoJson<Polygon>): Either<GuardError, GeoJsonPolygon> {
      const result = Guard.againstNullOrUndefined(p.coordinates, "POLYGON_COORDINATES");
      if (result.isLeft()) {
        return left(result.value);
      }

      return right(
        new GeoJsonPolygon({
          type: "Polygon",
          ...p
        })
      );
    }
  }
  export class GeoJsonPoint extends ValueObject<Point> {
    get value(): Point {
      return this.props;
    }

    get latitude(): number {
      return this.props.coordinates[0];
    }

    get longitude(): number {
      return this.props.coordinates[1];
    }

    get coordinates(): GeoJSON.Position {
      return this.props.coordinates;
    }

    private static validate(p: TreatedGeoJson<Point>): Either<GuardError, null> {
      const guardResult = Guard.againstNullOrUndefinedBulk([
        { argumentName: "Latitude", argument: p.coordinates[0] },
        { argumentName: "Longitude", argument: p.coordinates[1] }
      ]);

      if (guardResult.isLeft()) {
        return left(guardResult.value);
      }

      return right(null);
    }

    public static create(p: TreatedGeoJson<Point>): Either<GuardError, GeoJsonPoint> {
      const checkResult = this.validate(p);
      if (checkResult.isLeft()) {
        return left(checkResult.value);
      }

      return right(new GeoJsonPoint({ ...p, type: "Point" }));
    }
  }
}
