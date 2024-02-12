/**
 * Constructs getAllUsersUseCase and getAllUsersController 
 */
import { GetAllUsersUseCase } from "./getAllUsersUseCase";
import { GetAllUsersController } from "./getAllUsersController";
import { userRepo } from "../../repository";

const getAllUsersUseCase = new GetAllUsersUseCase(userRepo)
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

export {getAllUsersUseCase, getAllUsersController}
