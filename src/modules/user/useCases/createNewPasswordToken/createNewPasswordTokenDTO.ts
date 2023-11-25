import { JWTDTO } from "../../domain/jwt";
import { User } from "../../domain/user";

export interface CreateNewPasswordTokenDTO {
  user: User
}