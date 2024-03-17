import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request } from "express";

export class StatusController extends BaseController<Request> {
  constructor() {
    super();
    this.versionRegister.addToRegister("1.0.0", (req, res) => {
      this.ok(res);
    });
  }
}
