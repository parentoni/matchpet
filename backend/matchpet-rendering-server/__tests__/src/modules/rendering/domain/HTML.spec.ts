import { HTMLInput } from "../../../../../src/modules/rendering/domain/HTML";
import { HTML } from "../../../../../src/modules/rendering/domain/HTML";

describe('HTML', () => {
  it('should create a new HTML object', () => {
    const html = '<div></div>'
    const htmlOrError = HTML.create({html})

    expect(htmlOrError.isRight()).toBeTruthy()
  })

  it('should not create an invalid new HTML object', () => {
    const html = '<div>'
    const htmlOrError = HTML.create({html})

    expect(htmlOrError.isLeft()).toBeTruthy()
  })

  it('It should not exit on invalid HTML data', () => {

    expect(HTML.create({ html: ''})).toBeTruthy()
    expect(HTML.create({ html: undefined} as unknown as HTMLInput)).toBeTruthy()
  })
})
