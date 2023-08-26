import { IAuthService } from "../../../../modules/user/services/IauthService";
import express from 'express'
import { Guard } from "../../../core/Guard";
import { AuthenticatedRequest } from "../models/AutheticatedRequest";
export class Middleware {
    private authService: IAuthService;

    constructor (authService: IAuthService) {
        this.authService = authService
    }

    public authenticated () {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const token = req.headers['authorization']?.split(' ')[1]

            const result = Guard.againstNullOrUndefined(token, 'Authorization token')

            if (result.isRight() && token) {
                const decoded = await this.authService.decodeJWT(token)

                if (decoded.isRight()) {
                    if (decoded.value.verified === true) {
                        (req as AuthenticatedRequest).decoded = decoded.value
                        next()
                    } else {
                        return res.status(401).send("Unverified account")
                    }
                    
                } else {
                    return res.status(401).send(decoded.value.error)
                }


            } else {
                return res.status(401).send(result.value)
            }

            
        }
    }

}