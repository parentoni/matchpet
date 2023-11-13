import express from "express";
import { createUserController } from "../../../useCases/createUser";
import { middleware } from "../../../../../shared/infra/http";
import { getCurrentUserController } from "../../../useCases/getCurrentUser";
import { loginController } from "../../../useCases/login";
import { getUserInfoController } from "../../../useCases/getUserInfo";
import { UserLocation } from "../../../domain/userProps/userLocation";
// const userRouter = express.Router();
const authRouter = express.Router();

authRouter.post("/register", (req, res) => createUserController.execute(req, res));
authRouter.post("/login", (req, res) => loginController.execute(req, res));

authRouter.get("/myself", middleware.authenticated(), (req, res) => getCurrentUserController.execute(req, res));
authRouter.get('/test', (req,res) => {

  const location = UserLocation.create({coords: [-19.911087, -43.939513]})
  res.sendStatus(200)
})
authRouter.get("/:id", (req, res) => getUserInfoController.execute(req, res));


export { authRouter }; //
