import { userRepo } from "../../repository";
import { authService } from "../../services";
import { LoginController } from "./loginController";
import { LoginUseCase } from "./loginUseCase";

const loginUseCase = new LoginUseCase(userRepo, authService)
const loginController = new LoginController(loginUseCase)

export {loginController}