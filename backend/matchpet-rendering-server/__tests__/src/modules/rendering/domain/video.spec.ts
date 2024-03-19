import {Video} from "../../../../../src/modules/rendering/domain/video"
import { MediaProps } from "../../../../../src/modules/rendering/domain/media"

describe("Video", () => {
  it("should create an video", () => {
    const blob = new Blob([""], {type: "video/mp4"})
    const video = Video.create({raw: blob})
    expect(video.isRight()).toBeTruthy()
    expect(video.value).toBeInstanceOf(Video)
  })

  it("should not create an video with invalid data", () => {
    expect(Video.create({raw: null} as unknown as MediaProps).isLeft()).toBeTruthy()
  })

  it("should not create an video with invalid type", () => {
    const blob = new Blob([""], {type: "text/plain"})
    expect(Video.create({raw: blob}).isLeft()).toBeTruthy()
  })
})


