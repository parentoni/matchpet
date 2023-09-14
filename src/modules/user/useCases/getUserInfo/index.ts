import { GetUserInfoController } from "./getUserInfoController";
import { GetUserInfoUseCase  } from "./getUserInfoUseCase";
import { getUserByIdUseCase } from "../getUserByUID";
import { userRepo } from "../../repository";

const getUserInfoUseCase = new GetUserInfoUseCase(userRepo, getUserByIdUseCase)
const getUserInfoController = new GetUserInfoController(getUserInfoUseCase)

export {getUserInfoUseCase, getUserInfoController}