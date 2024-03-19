import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { HTMLElement, parse, valid } from 'node-html-parser'

/**
 * Props for HTML value object.
 */
export type HTMLProps = {
  html: HTMLElement
};

export type HTMLInput = {
  html: string
}

/**
 * HTML
 *
 * This value object represents a HTML.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class HTML extends ValueObject<HTMLProps> {
  get value(): HTMLElement {
    return this.props.html;
  }

  /**
   * Validate the given html.
   * @param {string} html
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  private static validate(html: string): Either<CommonUseCaseResult.InvalidValue, null>{
    
    // Guard agains undefined values
    const guardResult = Guard.againstNullOrUndefined(html, 'HTML')
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    // If HTML is invalid
    if (!valid(html)) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid HTML",
        variable: "HTML",
        location: "HTML.validate"
      }))
    }
  
    return right(null)
  }

  /**
   * Create a new HTML object.
   * @param {HTMLInput} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, HTML>}
   */
  public static create(props: HTMLInput): Either<CommonUseCaseResult.InvalidValue, HTML> {
    try {
      const HTMLOrError = this.validate(props.html)
      if (HTMLOrError.isLeft()) {
        return left(HTMLOrError.value)
      }

      // Parse the HTML
      const parsedHtml = parse(props.html)
      return right(new HTML({html: parsedHtml}))
    } catch (error) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid HTML",
        variable: "HTML",
        location: "HTML.create"
      }))
    }
  }
}
