import {Image} from "../../../../../src/modules/rendering/domain/image"
import { MediaProps } from "../../../../../src/modules/rendering/domain/media"

describe("Image", () => {
  it("should create an image", () => {
    const blob = new Blob([""], {type: "image/png"})
    const image = Image.create({raw: blob})
    expect(image.isRight()).toBeTruthy()
    expect(image.value).toBeInstanceOf(Image)
  })

  it("should not create an image with invalid data", () => {
    expect(Image.create({raw: null} as unknown as MediaProps).isLeft()).toBeTruthy()
  })

  it("should not create an image with invalid type", () => {
    const blob = new Blob([""], {type: "text/plain"})
    expect(Image.create({raw: blob}).isLeft()).toBeTruthy()
  })
})

