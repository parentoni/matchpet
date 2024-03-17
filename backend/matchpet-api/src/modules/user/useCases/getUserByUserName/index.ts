import { GetUserByUserNameUseCase } from "./getUserByUserNameUseCase";
import { GetUserByUserNameController } from "./getUserByUserNameController";
import { userRepo } from "../../repository";

const getUserByUserNameUseCase = new GetUserByUserNameUseCase(userRepo);
const getUserByUserNameController = new GetUserByUserNameController(getUserByUserNameUseCase);

export { getUserByUserNameController };
