import * as express from "express";
import { Request, Response } from "express";
import { CommonUseCaseResult } from "../../../core/response/useCaseError";
import { BaseError, GenericError, IBaseError } from "../../../core/response/error";

export type BaseControllerRequest<T extends Request> = (req: T, res: Response) => Promise<void | any> | void | any;
export type CatalogedErrors =
  | CommonUseCaseResult.Conflict
  | CommonUseCaseResult.InvalidValue
  | CommonUseCaseResult.UnexpectedError
  | CommonUseCaseResult.Forbidden
  | GenericError<any>;

export abstract class BaseController<T extends Request> {
  protected abstract executeImpl (req: T, res: express.Response): Promise<void | any>;

  public async execute (req: express.Request, res: express.Response): Promise<void> {
    try {
      await this.executeImpl(req as T, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(res: express.Response, code: number, message: any) {
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

  public fail(res: express.Response, error?: any) {
    console.log(error);
    return BaseController.jsonResponse(res, 500, error ? error : "Something went wrong");
  }

  //TODO BETTER ERROR HANDLING
  public errorHandler(res: express.Response, error: BaseError<IBaseError>) {
    try {
      return BaseController.jsonResponse(res, error.error.statusCode, error.error);
    } catch (error) {
      return this.fail(res, "Unknown error");
    }
  }
}
