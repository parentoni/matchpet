import { CreateUserVerificationTokenUseCase } from "./createUserVerificationTokenUseCase";
import { authService } from "../../services";

const createUserVerificationTokenUseCase = new CreateUserVerificationTokenUseCase(authService)

export {createUserVerificationTokenUseCase}