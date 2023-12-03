import { JWTDTO } from "../../domain/jwt";
import { CreateUserDTO } from "../createUser/CreateUserDTO";

export interface EditUserDTO {
  edit: Partial<CreateUserDTO>,
  jwt: JWTDTO
}