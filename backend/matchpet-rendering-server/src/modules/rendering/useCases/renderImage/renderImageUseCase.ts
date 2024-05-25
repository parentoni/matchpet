import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { IHTMLParser } from "../../services/IHtmlParser";
import { RenderImageDTO } from "./renderImageDTO";
import { RenderImageResponse } from "./renderImageResponse";
import { Image } from "../../domain/image";
import { HTML } from "../../domain/HTML";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { IDrawHTML } from "../../services/IDrawHTML";

export enum RENDER_IMAGE_MIME_TYPE {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
  jpg = 'image/jpg',
}

/**
 * 
 * @class RenderImageUseCase
 * @classdesc Class that render html images.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class RenderImageUseCase implements UseCase<RenderImageDTO, RenderImageResponse> {
  htmlParser: IHTMLParser;
    drawHTML: IDrawHTML;

  constructor(htmlParser: IHTMLParser, drawHTML: IDrawHTML) {
    this.htmlParser = htmlParser;
    this.drawHTML = drawHTML;
  }

  async execute(request: RenderImageDTO): Promise<RenderImageResponse> {

    // check if request mime type is valid
    if (!Object.values(RENDER_IMAGE_MIME_TYPE).includes(request.type as RENDER_IMAGE_MIME_TYPE)) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid export mime type. only png, jpeg and webp are supported.",
        variable: "type",
        location: "RenderImageUseCase.execute",
      }))
    }

    // create the html virtual dom with the html string code
    const htmlCode = HTML.create({ html: request.html })
    if (htmlCode.isLeft()) {
      return left(htmlCode.value);
    }

    // parse the html code to get medias as base64.
    const response = await this.htmlParser.parse({html: htmlCode.value});
    if (response.isLeft()) {
      return left(response.value);
    }

    // draw the html code to an image
    const image = await this.drawHTML.image({
      html: htmlCode.value,
      width: request.width,
      height: request.height,
      type: request.type as RENDER_IMAGE_MIME_TYPE,
    });
    if (image.isLeft()) {
      return left(image.value);
    }

    return image
  }
}
