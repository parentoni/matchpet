import express from "express";
import { getUserInfoController } from "../../../useCases/getUserInfo";
import { getAllActiveOrganizationsController } from "../../../useCases/getAllActiveOrganizations";
import { getUserByUserNameController } from "../../../useCases/getUserByUserName";

const userRouter = express.Router();

userRouter.get("/:id/contact", (req, res) => getUserInfoController.execute(req, res));
userRouter.get("/active", (req, res) => getAllActiveOrganizationsController.execute(req, res));

userRouter.post('/username', (req, res) => getUserByUserNameController.execute(req,res))
export { userRouter };
