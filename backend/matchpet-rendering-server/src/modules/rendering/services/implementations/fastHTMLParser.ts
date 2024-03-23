import { Image } from "../../domain/image";
import { HTMLParserDTO, HTMLParserResponse, IHTMLParser } from "../IHtmlParser";
import { left, right } from "../../../../shared/core/result";
import { IExternalMediaManager } from "../IContentManager";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Media } from "../../domain/media";
import { MediaUtils } from "../../../../shared/utils/MediaUtils";

/**
 * Parse html code substituting media by base64
 */
export class FastHTMLParser implements IHTMLParser {
  externalMediaManager: IExternalMediaManager;

  /**
   * Injects the external media manager.
   * */
  constructor(externalMediaManager: IExternalMediaManager) {
    this.externalMediaManager = externalMediaManager;
  }

  async parse(props: HTMLParserDTO): HTMLParserResponse {

    // query all media that has http on its src attribute 
    const externalMedias = props.html.value.querySelectorAll("[src*=http]");
    const base64Medias = props.html.value.querySelectorAll("[src*=data:]");

    //define array of media
    const medias: Media[] = [];

    // iterate thoru all medias and download them.
    for (const media of externalMedias) {
      const src = media.getAttribute("src");
      if (!src) {
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Media src attribute is not set.",
          variable: "SRC",
          location: "FastHTMLParser.parse"
        }));
      }

      // fetch the media
      const mediaResponse = await this.externalMediaManager.download({src});
      if (mediaResponse.isLeft()) {
        return left(mediaResponse.value);
      }

      // convert the media to base64
      const arrayBuffer = await mediaResponse.value.value.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      // set the media src to the base64 string
      media.setAttribute("src", `data:${mediaResponse.value.value.type};base64,${base64}`);
      medias.push(mediaResponse.value);
    }

    // iterate thoru all base64 medias and add them to the medias array.
    for (const media of base64Medias) {
      const src = media.getAttribute("src");
      if (!src) {
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Media src attribute is not set.",
          variable: "SRC",
          location: "FastHTMLParser.parse"
        }));
      }

      const base64Media = MediaUtils.parseBase64({src});
      if (base64Media.isLeft()) {
        return left(base64Media.value);
      }

      medias.push(base64Media.value);
    }

    return right({ html: props.html.value.toString(), media: medias });
  }
}
