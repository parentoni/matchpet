import { User } from "../../domain/user";

export interface CreateUserVerificationTokenDTO {
  user: User,
}