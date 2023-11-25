import { getUserByIdUseCase } from "../getUserByUID";
import { GetCurrentUserController } from "./GetCurrentUserController";
import { GetCurrentUserUseCase } from "./GetCurretnUserUseCase";

const getCurrentUserUseCase = new GetCurrentUserUseCase(getUserByIdUseCase);
const getCurrentUserController = new GetCurrentUserController(getCurrentUserUseCase);

export { getCurrentUserController };
