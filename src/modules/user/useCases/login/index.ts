import { userRepo } from "../../repository";
import { LoginController } from "./loginController";
import { LoginUseCase } from "./loginUseCase";

const loginUseCase = new LoginUseCase(userRepo);
const loginController = new LoginController(loginUseCase);

export { loginController };
