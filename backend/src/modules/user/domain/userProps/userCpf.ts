import { Guard } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { cpf } from "cpf-cnpj-validator";
export interface IUserCpfProps {
  value?: string;
}
type UserCpfResponse = Either<CommonUseCaseResult.InvalidValue, UserCpf | undefined>;

export class UserCpf extends ValueObject<IUserCpfProps> {
  get value(): string {
    return this.props.value || "";
  }

  private static isValid(testingCpf: string): boolean {
    return cpf.isValid(testingCpf);
  }

  private static format(testingCpf: string): string {
    return cpf.strip(testingCpf);
  }

  public static create(props: IUserCpfProps): UserCpfResponse {
    if (!props.value) {
      return right(undefined);
    }
    const exists = Guard.againstNullOrUndefined(props.value, "cpf");

    if (exists.isLeft()) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: exists.value.error.errorMessage,
          location: `${UserCpf.name}.${UserCpf.create.name}`,
          variable: "CPF"
        })
      );
    }

    if (this.isValid(props.value)) {
      return right(
        new UserCpf({
          value: this.format(props.value)
        })
      );
    } else {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: `Invalid CPF {${props.value}}`,
          location: `${UserCpf.name}.${UserCpf.create.name}`,
          variable: "CPF"
        })
      );
    }
  }

  public mask() {
    const formated = cpf.format(this.value);

    const clear = formated.split(".")[0];
    const clearEnd = formated.split("-")[1];

    return `${clear}.***.***-${clearEnd}`;
  }
}
