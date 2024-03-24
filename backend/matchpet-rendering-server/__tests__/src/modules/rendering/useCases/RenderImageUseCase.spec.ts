import { RenderImageUseCase } from "../../../../../src/modules/rendering/useCases/renderImage/renderImageUseCase";
import { FastHTMLParser } from "../../../../../src/modules/rendering/services/implementations/fastHTMLParser";
import { HttpContentManager } from "../../../../../src/modules/rendering/services/implementations/httpContentManager";
import { PuppeteerDraw } from "../../../../../src/modules/rendering/services/implementations/puppeteerDraw";
import puppeteer from "puppeteer";
import { Image } from "../../../../../src/modules/rendering/domain/image";
import { left, right } from "../../../../../src/shared/core/result";
import { HTML } from "../../../../../src/modules/rendering/domain/HTML";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";

// define the dependencies
const httpContentManager = new HttpContentManager();
const htmlParser = new FastHTMLParser(httpContentManager); 
const puppeteerDraw = new PuppeteerDraw(); 
const imageRender = new RenderImageUseCase(htmlParser, puppeteerDraw);

//mock the dependencies
puppeteer.launch = jest.fn().mockResolvedValue({
  newPage: jest.fn().mockResolvedValue({
    screenshot: jest.fn().mockImplementation(async (props: {type: string}) => {
      if (props.type === 'png') return Buffer.from('imageData');
      throw new Error('Invalid type');
    }),
    close: jest.fn().mockImplementation(()=>{}),
    setContent: jest.fn().mockImplementation(()=>{}),
    setViewport: jest.fn().mockImplementation(()=>{})
  }),
  close: jest.fn().mockImplementation(()=>{})
}) as any;

htmlParser.parse = jest.fn().mockImplementation(async (props: {html: HTML}) => {
  if (props.html.value.toString() === '<error></error>') return left(CommonUseCaseResult.InvalidValue.create({errorMessage: 'Invalid HTML', variable: "HTML", location: "HTML"})); 
  return right({html: props.html.value.toString(), media: []});
})

describe('RenderImageUseCase', () => {

  it("should succesfully create a new screenshot", async () => {
    const response = await imageRender.execute({html: '<p>test</p>', type: "image/png", width: 100, height: 100});
    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeInstanceOf(Image);
  })

  it("should return left when image output format is not supported", async () => {
    const response = await imageRender.execute({html: '<p>test</p>', type: "unsupported", width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })

  it("should return left when the html code is invalid", async () => {
    const response = await imageRender.execute({html: '<p>', type: "image/png", width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })

  it("should return left when parsing fails", async () => {
    const response = await imageRender.execute({html: '<error></error>', type: "image/png", width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })

  it("should return left when html rendering fails", async () => {
    console.error = jest.fn();
    const response = await imageRender.execute({html: '<p>test</p>', type: "image/jpeg", width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })

})
