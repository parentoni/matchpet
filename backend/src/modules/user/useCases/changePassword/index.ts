import { ChangePasswordController } from "./changePasswordController";
import { ChangePasswordUseCase } from "./changePasswordUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repository";

const changePasswordUseCase = new ChangePasswordUseCase(authService, userRepo);
const changePasswordController = new ChangePasswordController(changePasswordUseCase);

export { changePasswordController };
