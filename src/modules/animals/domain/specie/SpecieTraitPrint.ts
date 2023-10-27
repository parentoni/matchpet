import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { SpecieTraitProps } from "./SpecieTrait";

export interface SpecieTraitPrintProps {
  value: string;
}
export class SpecieTraitPrint extends ValueObject<SpecieTraitPrintProps> {
  get value() {
    return this.props.value;
  }

  private static validate(value: string): Either<GuardError | CommonUseCaseResult.InvalidValue, string> {
    const guardResult = Guard.againstNullOrUndefined(value, "SPECIE_TRAIT_PRINT_STRING");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    if (!value.includes("{x}")) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${SpecieTraitPrint.name}.${this.validate.name}`,
          errorMessage: "Variable {x} not found on print message.",
          variable: "{X}"
        })
      );
    }

    return right(value);
  }

  public static create(props: SpecieTraitPrintProps): Either<GuardError | CommonUseCaseResult.InvalidValue, SpecieTraitPrint> {
    const validateResult = this.validate(props.value);
    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(new SpecieTraitPrint({ value: validateResult.value }));
  }

  public format(x: any) {
    return this.value.replace("{x}", x);
  }
}
