import { Media, MediaProps } from "../../../../../src/modules/rendering/domain/media";
import { ValueObject } from "../../../../../src/shared/domain/ValueObject";

class TestMedia extends Media {
}

describe('Media', () => {
  it('should map a blob to base64', async () => {
    const mediaProps: MediaProps = {
      raw: new Blob(['TEST'], { type: 'image/png' })
    }
    const media = new TestMedia(mediaProps)
    const base64 = await media.toBase64()
    expect(base64).toEqual('data:image/png;base64,VEVTVA==')
  })

  it('should map a blob to buffer', async () => {
    const mediaProps: MediaProps = {
      raw: new Blob(['TEST'], { type: 'image/png' })
    }
    const media = new TestMedia(mediaProps)
    const buffer = await media.toBuffer()
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.toString()).toEqual('TEST')
  })

})
