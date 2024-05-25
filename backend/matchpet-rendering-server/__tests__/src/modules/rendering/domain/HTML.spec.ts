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

  it("should fail with missing html", () => {
    const htmlOrError = HTML.create({html: ''})

    expect(htmlOrError.isLeft()).toBeTruthy() 
    if (htmlOrError.isRight()) return;
    expect(htmlOrError.value.error.location).toEqual('Guard.againstNullOrUndefined')
  })
})
