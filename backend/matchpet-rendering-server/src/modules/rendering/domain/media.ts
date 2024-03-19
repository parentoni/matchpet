import { ValueObject } from "../../../shared/domain/ValueObject"

export type MediaPropsInput = {
  raw: Blob
}

export type MediaProps = {
  raw: Blob,
  type: string
}

/**
 * Media.
 *
 * All media types should extend this class. 
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export abstract class Media extends ValueObject<MediaProps> {

  get value(): Blob {
    return this.props.raw
  }

  get type(): string {
    return this.props.type
  }


}
