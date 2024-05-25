import { ValueObject } from "../../../shared/domain/ValueObject"

export type MediaPropsInput = {
  raw: Blob
}

export type MediaProps = {
  raw: Blob,
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


  public async toBase64(): Promise<string> {
    const buff = await this.props.raw.arrayBuffer()
    const base64 = Buffer.from(buff).toString('base64');
    return `data:${this.props.raw.type};base64,${base64}`
  }

  public async toBuffer(): Promise<Buffer> {
    const buff = await this.props.raw.arrayBuffer()
    return Buffer.from(buff)
  }
}
