import express from "express";
import { createUserController } from "../../../useCases/createUser";
import { middleware } from "../../../../../shared/infra/http";
import { getCurrentUserController } from "../../../useCases/getCurrentUser";
import { loginController } from "../../../useCases/login";
import { getUserInfoController } from "../../../useCases/getUserInfo";
import { UserLocation } from "../../../domain/userProps/userLocation";
import { verifyUserController } from "../../../useCases/verifyUser";
import { changePasswordController } from "../../../useCases/changePassword";
import { sendChangePasswordEmailController } from "../../../useCases/sendChangePasswordEmail";
import { accessAsUserContoller } from "../../../useCases/accessAsUser";
// const userRouter = express.Router();
const authRouter = express.Router();

authRouter.post("/register", (req, res) => createUserController.execute(req, res));
authRouter.post("/login", (req, res) => loginController.execute(req, res));
authRouter.post("/verify", (req, res) => verifyUserController.execute(req, res));
authRouter.post("/password/new", (req, res) => sendChangePasswordEmailController.execute(req, res));
authRouter.post('/access', middleware.admin(), (req, res) => accessAsUserContoller.execute(req, res))

authRouter.put("/password/new", (req, res) => changePasswordController.execute(req, res));

export { authRouter }; //
