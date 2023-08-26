import { userRepo } from "../../repository";
import { GetUserByUIDUseCase } from "./getUserByUIDUseCase";
const getUserByIdUseCase = new GetUserByUIDUseCase(userRepo)

export {getUserByIdUseCase}