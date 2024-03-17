import { EditUserUseCase } from "./EditUserUseCase";
import { EditUserController } from "./EditUserController";
import { userRepo } from "../../repository";

const editUserUseCase = new EditUserUseCase(userRepo);
const editUserController = new EditUserController(editUserUseCase);

export { editUserController };
