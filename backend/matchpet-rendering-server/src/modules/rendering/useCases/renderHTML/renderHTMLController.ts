import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { RenderImageUseCase } from "../renderImage/renderImageUseCase";

/**
 * 
 * @class RenderHTMLController
 * @classdesc Controller that handle the render for html request.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class RenderHTMLController extends BaseController<Request> {
  renderImageUseCase: RenderImageUseCase;


  /**
   * Injects the renderers use cases.
   * */
  constructor(renderImageUseCase: RenderImageUseCase) {
    super();
    this.renderImageUseCase = renderImageUseCase;
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const accept = req.headers.accept;

    // if the request is for an image render image
    if (accept?.includes("image/")) {
      // render the image
      const response = await this.renderImageUseCase.execute({ html: req.body, type: accept});
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      return res.status(200).send(response.value);
    }

    // if the request is for a video render video
    if (accept?.includes("video/")) {
      return res.status(200).send("Video rendering is not supported yet.");
    }

    res.status(415).send("ACCEPT header is not set or is not supported.");
  }
}
