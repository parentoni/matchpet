import { Guard, GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

export interface UserNameProps {
  username: string
}

export class UserName extends ValueObject<UserNameProps>{
  
  protected static REGEX_CHECK = RegExp(/^[a-zA-Z0-9_.-]*\b\w{1,100}\b$/g)
  
  get value():string {
    return this.props.username
  }

  private static validate (props:UserNameProps): Either<GuardError, string> {
    const guardResult = Guard.againstNullOrUndefined(props.username, 'USER_USERNAME')
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    const regexResult = props.username.match(this.REGEX_CHECK)
    if (!regexResult) {
      return left(CommonUseCaseResult.InvalidValue.create({
        location: `${UserName.name}.${UserName.validate.name}`,
        errorMessage: `Username '${props.username}' doesn't match expected regex: /^[a-zA-Z0-9_.-]*\b\w{1,100}\b$/g`,
        variable: "USER_USERNAME"
      }))
    }

    return right(props.username)
  }

  public static create (props: UserNameProps): Either<GuardError, UserName> {
    const result = this.validate(props)
    if (result.isLeft()) {
      return left(result.value)
    }

    const userNameString = result.value
    return right(new UserName({username: userNameString}))
  }
}