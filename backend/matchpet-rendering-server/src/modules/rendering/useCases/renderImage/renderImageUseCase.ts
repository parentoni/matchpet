import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { IHTMLParser } from "../../services/IHtmlParser";
import { RenderImageDTO } from "./renderImageDTO";
import { RenderImageResponse } from "./renderImageResponse";
import { Image } from "../../domain/image";
import { HTML } from "../../domain/HTML";

/**
 * 
 * @class RenderImageUseCase
 * @classdesc Class that render html images.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class RenderImageUseCase implements UseCase<RenderImageDTO, RenderImageResponse> {
  htmlParser: IHTMLParser;

  constructor(htmlParser: IHTMLParser) {
    this.htmlParser = htmlParser;
  }

  async execute(request: RenderImageDTO): Promise<RenderImageResponse> {

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

    console.log(response.value.html)
    // create domain image
    const image = Image.create({raw: new Blob([], {type: request.type})})
    return image
  }
}
