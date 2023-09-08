import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { Entity } from "../../../../shared/domain/Entity";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { SpecieTraitOption } from "./SpecieTraitOption";

export interface SpecieTraitProps {
  name: string;
  svg: ValidUrl;
  optional: boolean;
  category: string;
  options: SpecieTraitOption[];
}

export class SpecieTrait extends Entity<SpecieTraitProps> {
  private constructor(props: SpecieTraitProps, id?: UniqueGlobalId) {
    super(props, id);
  }

  get specieTraitId(): UniqueGlobalId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get svg(): ValidUrl {
    return this.props.svg;
  }

  get optional(): boolean {
    return this.props.optional;
  }

  get category(): string {
    return this.props.category;
  }

  get options(): SpecieTraitOption[] {
    return this.props.options;
  }

  public static create(props: SpecieTraitProps, id?: UniqueGlobalId): Either<GuardError, SpecieTrait> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "SPECIE_PROPS_NAME" },
      { argument: props.svg, argumentName: "SPECIE_PROPS_SVG" },
      { argument: props.category, argumentName: "SPECIE_PROPS_CATEGORY" },
      { argument: props.options, argumentName: "SPECIE_PROPS_OPTIONS" },
      { argument: props.optional, argumentName: "SPECIE_PROPS_OPTIONAL" },
      { argument: props.options, argumentName: "SPECIFIC_PROPS_OPTIONS" }
    ]);

    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    return right(new SpecieTrait({ ...props, name: props.name.toString() }, id));
  }
}
