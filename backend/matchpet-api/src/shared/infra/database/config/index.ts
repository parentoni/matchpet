import mongoose from "mongoose";
import { Secrets } from "../../../../config/secretsManager";

export function connect() {
  console.log(Secrets.getSecret("MONGO_URL"), "mongourl")
  mongoose.connect(Secrets.getSecret("MONGO_URL")).then(() => {
    console.log("[App]: Connected to database");
  })
}

connect();
