import { User } from "../../domain/user";

export interface SendUserVerificationEmailDTO {
  user: User;
}
