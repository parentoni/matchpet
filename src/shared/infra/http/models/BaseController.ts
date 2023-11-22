import * as express from "express";
import { Request, Response } from "express";
import { VersionControl, VersionControlRegister } from "../../../core/VersionControl";
import { CommonUseCaseResult } from "../../../core/Response/UseCaseError";
import { AppError } from "../../../core/Response/AppError";
import { GenericError } from "../../../core/Response/Error";
import { AuthenticatedRequest } from "./AutheticatedRequest";
import { Either } from "../../../core/Result";

export type BaseControllerRequest<T extends Request> = (req: T, res: Response) => Promise<void | any> | void | any;
export type CatalogedErrors =
  | CommonUseCaseResult.Conflict
  | CommonUseCaseResult.InvalidValue
  | CommonUseCaseResult.UnexpectedError
  | CommonUseCaseResult.Forbidden
  | AppError.UnexpectedError
  | GenericError<any>;

export abstract class BaseController<T extends Request> {
  protected versionRegister = new VersionControl<BaseControllerRequest<T>>();

  // protected abstract executeImpl (req: express.Request, res: express.Response): Promise<void | any>;

  public async execute(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userV = req.headers["accept-version"];
      const versionSearch = this.versionRegister.getVersion(userV as string | undefined);

      if (versionSearch.isLeft()) {
        const maxV = this.versionRegister.max();
        if (maxV.isLeft()) {
          this.fail(res, maxV.value.prettyError());
        } else {
          this.notFound(res, `Version ${userV} not found, current version: ${maxV.value}`);
        }
      } else {
        versionSearch.value(req as T, res);
      }
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      this.fail(res, "An unexpected error occurred");
    }
  }

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : "Unauthorized");
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : "Unauthorized");
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : "Payment required");
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : "Forbidden");
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : "Not found");
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : "Conflict");
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : "Too many requests");
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public tooLarge(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 413, message ? message : "Too many requests");
  }

  public fail(res: express.Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString()
    });
  }

  //TODO BETTER ERROR HANDLING
  public errorHandler(res: express.Response, error: CatalogedErrors) {
    switch (error.constructor) {
      case CommonUseCaseResult.InvalidValue:
        return this.clientError(res, error.error);
      case CommonUseCaseResult.Conflict:
        return this.conflict(res, error.error);
      case AppError.UnexpectedError:
        return this.fail(res, error.error);
      case CommonUseCaseResult.UnexpectedError:
        return this.fail(res, error.error);
      case CommonUseCaseResult.Forbidden:
        return this.forbidden(res, error.error);
      case GenericError:
        return this.clientError(res, error.error);
    }

    this.fail(res, "Unknown error");
  }
}
