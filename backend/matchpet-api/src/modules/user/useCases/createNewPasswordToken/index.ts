import { authService } from "../../services";
import { CreateNewPasswordTokenUseCase } from "./createNewPasswordTokenUseCase";

const createNewPasswordToken = new CreateNewPasswordTokenUseCase(authService);

export { createNewPasswordToken };
