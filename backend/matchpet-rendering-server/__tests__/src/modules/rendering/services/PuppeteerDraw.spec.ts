import { HTML } from '../../../../../src/modules/rendering/domain/HTML';
import { Image } from '../../../../../src/modules/rendering/domain/image';
import { PuppeteerDraw } from '../../../../../src/modules/rendering/services/implementations/puppeteerDraw';
import { RENDER_IMAGE_MIME_TYPE } from '../../../../../src/modules/rendering/useCases/renderImage/renderImageUseCase';
const puppeteerDraw = new PuppeteerDraw();
import puppeteer from 'puppeteer';

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

const createHtml = (content: string) => {
  return HTML.create({html: content}).value as HTML;
}

describe('PuppeteerDraw', () => {

  it("should return left when image output format is not supported", async () => {
    const response = await puppeteerDraw.image({html: createHtml('<p>test</p>'),type: "unsupported" as RENDER_IMAGE_MIME_TYPE, width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })

  it("should succesfully create a new screenshot", async () => {
    const response = await puppeteerDraw.image({html: createHtml('<p>test</p>'),type: "image/png" as RENDER_IMAGE_MIME_TYPE, width: 100, height: 100});
    expect(response.isRight()).toBeTruthy();
    if (response.isLeft()) return;
    expect(response.value).toBeInstanceOf(Image);
  })

  it("should return left when puppeteer throws an error", async () => {
    console.error = jest.fn();
    const response = await puppeteerDraw.image({html: createHtml('<p>test</p>'),type: "image/jpeg" as RENDER_IMAGE_MIME_TYPE, width: 100, height: 100});
    expect(response.isLeft()).toBeTruthy();
  })
})
