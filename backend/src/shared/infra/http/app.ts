import express from "express";
import { v1Router } from "./api/v1";
import { Secrets } from "../../../config/secretsManager";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import https from "node:https";
import fs from "node:fs";
const cors = require("cors");
const app = express(); //

app.use(morgan(Secrets.NODE_ENV === "development" ? "dev" : "common"));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.disable("etag");

app.use("/", v1Router);

const port = Secrets.getSecret("port");

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
