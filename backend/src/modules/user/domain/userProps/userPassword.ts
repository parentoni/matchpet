import { ValueObject } from "../../../../shared/domain/ValueObject";
import * as bcrypt from "bcrypt";
import { Guard } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { GenericError, IBaseResponse, success } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
// import { Result } from "../../../shared/core/Result";
export interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

type IUserPasswordResponse = Either<CommonUseCaseResult.InvalidValue, UserPassword>;

export class UserPassword extends ValueObject<IUserPasswordProps> {
  public static minLength = 6;
  public static saltRounds = 10;

  get value(): string {
    return this.props.value;
  }

  private static isValidLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  /**
   *@method comparePassword
   *@desc Compares the stored password value and a plain text one
   */

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    if (this.isAlreadyHashed()) {
      return await this.hashCompare(plainTextPassword, this.props.value);
    } else {
      return this.value === plainTextPassword;
    }
  }

  private async hashCompare(plainText: string, hash: string): Promise<boolean> {
    return !!(await bcrypt.compare(plainText, hash));
  }

  public isAlreadyHashed(): boolean {
    return !!this.props.hashed;
  }

  private static async hashPassword(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) {
      return this.value;
    } else {
      return await UserPassword.hashPassword(this.value);
    }
  }

  public static create(props: IUserPasswordProps): IUserPasswordResponse {
    const propsResult = Guard.againstNullOrUndefined(props.value, "password");

    if (propsResult.isLeft()) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: "password not found",
          location: `${UserPassword.name}.${UserPassword.create.name}`,
          variable: "password"
        })
      );
    }

    if (!props.hashed && !this.isValidLength(props.value)) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Password doesnt meet criteria [6 chars min]",
          location: `${UserPassword.name}.${UserPassword.create.name}`,
          variable: "password"
        })
      );
    }

    return right(
      new UserPassword({
        value: props.value,
        hashed: props.hashed
      })
    );
  }
}
