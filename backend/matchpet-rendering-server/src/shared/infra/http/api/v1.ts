import express from "express";
import { renderRouter } from "../../../../modules/rendering/infra/http/routes/rendering";

const v1Router = express.Router();

v1Router.use("/render", renderRouter)

export { v1Router };
