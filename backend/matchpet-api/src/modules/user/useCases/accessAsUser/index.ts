/**
 * construct usecase and controller for access as user fucntionality
 */
import { AccessAsUserUseCase } from "./accessAsUserUseCase";
import { AccessAsUserController } from "./accessAsUserContoller";
import { authService } from "../../services";
import { getUserByIdUseCase } from "../getUserByUID";

const accessAsUserUseCase = new AccessAsUserUseCase(getUserByIdUseCase, authService)
const accessAsUserContoller = new AccessAsUserController(accessAsUserUseCase)

export {accessAsUserUseCase, accessAsUserContoller}
