import { VerifyUserUseCase } from "./verifyUserUseCase";
import { VerifyUserController } from "./verifyUserController";
import { authService } from "../../services";
import { userRepo } from "../../repository";

const verifyUserUseCase = new VerifyUserUseCase(authService, userRepo);
const verifyUserController = new VerifyUserController(verifyUserUseCase);

export { verifyUserController };
