import { userRepo } from "../../repository";
import { LoginController } from "./loginController";
import { LoginUseCase } from "./loginUseCase";
import { authService } from "../../services";

const loginUseCase = new LoginUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController };
