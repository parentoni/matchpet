import { Guard } from "../shared/core/Guard";
import * as dotenv from "dotenv";

type TEnv = "development" | "production";
export class Secrets {
  private static instance: Secrets;

  private constructor(env: TEnv) {
    dotenv.config({
      path: __dirname + `/../../static/env/.env.${env === "development" ? "development" : "production"}`
    });
  }

  public static getSecret(secret: string): string {
    if (!this.instance) {
      this.instance = new Secrets(process.env.NODE_ENV as TEnv);
    }

    const result = Guard.againstNullOrUndefined(process.env[secret.toUpperCase()], `Enviroment variable ${secret}`);

    if (result.isRight()) return process.env[secret.toUpperCase()] as string;
    throw new Error(`Unknow enviroment varible ${secret.toUpperCase()}`);
  }

  public static get NODE_ENV() {
    return process.env.NODE_ENV as TEnv;
  }
}
