import express from "express";
import { getUserInfoController } from "../../../useCases/getUserInfo";
import { getAllActiveOrganizationsController } from "../../../useCases/getAllActiveOrganizations";
import { getUserByUserNameController } from "../../../useCases/getUserByUserName";
import { middleware } from "../../../../../shared/infra/http";
import { editUserController } from "../../../useCases/editUser";
import { getCurrentUserController } from "../../../useCases/getCurrentUser";

const userRouter = express.Router();

userRouter.get("/:id/contact", (req, res) => getUserInfoController.execute(req, res));
userRouter.get("/active", (req, res) => getAllActiveOrganizationsController.execute(req, res));
userRouter.get("/myself", middleware.authenticated(), (req, res) => getCurrentUserController.execute(req, res));

userRouter.post('/username', (req, res) => getUserByUserNameController.execute(req,res))

userRouter.put('/myself', middleware.authenticated(), (req, res) => editUserController.execute(req,res))
export { userRouter };
