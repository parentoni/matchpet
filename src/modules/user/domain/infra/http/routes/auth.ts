import express from "express";
import { createUserController } from "../../../../useCases/createUser";
import { middleware } from "../../../../../../shared/infra/http";
import { getCurrentUserController } from "../../../../useCases/getCurrentUser";
import { loginController } from "../../../../useCases/login";
import { getUserInfoController } from "../../../../useCases/getUserInfo";
// const userRouter = express.Router();
const authRouter = express.Router();

authRouter.post("/register", (req, res) => createUserController.execute(req, res));
authRouter.post("/login", (req, res) => loginController.execute(req, res));

authRouter.get("/myself", middleware.authenticated(), (req, res) => getCurrentUserController.execute(req, res));
authRouter.get("/:id", (req, res) => getUserInfoController.execute(req, res));
export { authRouter }; //
