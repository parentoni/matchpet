import { IAuthService } from "../../../../modules/user/services/IauthService";
import express from "express";
import { Guard } from "../../../core/Guard";
import { AuthenticatedRequest } from "../models/AutheticatedRequest";
import { decode } from "node:punycode";
export class Middleware {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public authenticated() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token = req.headers["authorization"]?.split(" ")[1];

      const result = Guard.againstNullOrUndefined(token, "Authorization token");

      if (result.isRight() && token) {
        const decoded = await this.authService.decodeJWT(token);

        if (decoded.isRight()) {
          if (decoded.value.verified === true) {
            (req as AuthenticatedRequest).decoded = decoded.value;
            next();
          } else {
            return res.status(401).send("Unverified account");
          }
        } else {
          return res.status(403).send(decoded.value.error);
        }
      } else {
        return res.status(401).send(result.value);
      }
    };
  }

  /**
   * Middleware for admin only routes. Consider admin every user with role = 10
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public admin()  {

    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //Get bearer token value
    const token = req.headers["authorization"]?.split(" ")[1];

    const guardResult = Guard.againstNullOrUndefined(token, "token")

    // if not token return missing token repsonse (401)
    if (guardResult.isLeft()) {
      return res.status(401).send(guardResult.value.prettyError())
    }

    //decode jwt
    const decoded = await this.authService.decodeJWT(token as string) // Assumets token as string since it has been checked by guard

    //If error decoding, send error forbidden
    if (decoded.isLeft()){
      return res.status(403).send(decoded.value.prettyError())
    }

    //If not admin
    if (decoded.value.role !== 10) {
      return res.status(403).send("Admin only route")
    }

    //authenticate
    next()
    }

  }
}
