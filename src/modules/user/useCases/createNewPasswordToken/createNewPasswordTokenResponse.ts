import { GuardError } from "../../../../shared/core/Guard";
import { Either } from "../../../../shared/core/Result";

export type CreateNewPasswordTokenResponse = Either<GuardError, CreateUserPasswordTokenSuccess>


export type CreateUserPasswordTokenSuccess = {
  url:string;
  token:string;
}