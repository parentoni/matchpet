import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError"
import { Either } from "../../../shared/core/result"
import { HTML } from "../domain/HTML"
import { Media } from "../domain/media"


export type HTMLParserResponse = Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, { html: string, media: Media[]}>>
export type HTMLParserDTO = { html: HTML }

/**
 * Interface that should parse html code, extracting images/videos and substituing them by base64.
 */
export interface IHTMLParser {

  /**
   * Parse the html code, extracting images/videos and substituing them by base64.
   * @param props.html - The html code to be parsed.
   * @returns Either a CommonUseCaseResult or a {html:string, media: Media[]}.
   * */
  parse(props: HTMLParserDTO): HTMLParserResponse
}
