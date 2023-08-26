import express, { Request, Response } from "express";
import { authRouter } from "../../../../modules/user/infra/http/routes";
import { animalsRouter } from "../../../../modules/animals/infra/http/routes/animals";

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use('/animals', animalsRouter)
v1Router.get("/app/status", (req, res) => res.sendStatus(200))

export { v1Router };
