import { Response } from "express";
import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserByUIDUseCase } from "../getUserByUID/getUserByUIDUseCase";
import { TokenFunctions } from "../../domain/jwt";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";

export class GetCurrentUserController extends BaseController<AuthenticatedRequest> {
    constructor (useCase: GetUserByUIDUseCase) {
        super()

        this.versionRegister.addToRegister('1.0.0', async (req: AuthenticatedRequest, res: Response) => {

            if (req.decoded.token_function !== TokenFunctions.authenticateUser) {
                return this.errorHandler(res, CommonUseCaseResult.Forbidden.create({
                    location: `${GetCurrentUserController.name}`,
                    variable: "TOKEN_FUNCTION",
                    errorMessage: "Invalid token function, expected authentication token found " + req.decoded.token_function,
                }))
            }
            
            const uid = req.decoded.uid

            const response = await useCase.execute({uid})
            if (response.isLeft()) {
                this.errorHandler(res, response.value)
            } else {
                this.ok(res, response.value)
            }
        })
    }
}