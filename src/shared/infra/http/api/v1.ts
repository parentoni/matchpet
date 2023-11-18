import express from "express";
import { authRouter } from "../../../../modules/user/infra/http/routes/auth";
import { animalsRouter } from "../../../../modules/animals/infra/http/routes/animals";
import { userRouter } from "../../../../modules/user/infra/http/routes/user";
import { appRouter } from "../../../../modules/app/infra/http/routes/app";

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);
v1Router.use('/app', appRouter)
v1Router.use("/animals", animalsRouter);



export { v1Router };
