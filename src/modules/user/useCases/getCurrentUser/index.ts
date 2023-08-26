import { getUserByIdUseCase } from "../getUserByUID";
import { GetCurrentUserController } from "./GetCurrentUserController";

const getCurrentUserController = new GetCurrentUserController(getUserByIdUseCase)

export {getCurrentUserController}