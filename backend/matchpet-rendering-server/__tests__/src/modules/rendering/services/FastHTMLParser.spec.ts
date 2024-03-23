import { HTML } from "../../../../../src/modules/rendering/domain/HTML";
import { FastHTMLParser } from "../../../../../src/modules/rendering/services/implementations/fastHTMLParser";
import { HttpContentManager } from "../../../../../src/modules/rendering/services/implementations/httpContentManager";
import { left, right } from "../../../../../src/shared/core/result";
import { Image } from "../../../../../src/modules/rendering/domain/image";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";
import { Video } from "../../../../../src/modules/rendering/domain/video";

const httpContentManager = new HttpContentManager();
const fastHtmlParser = new FastHTMLParser(httpContentManager);
httpContentManager.download = jest.fn().mockImplementation(async (props: {src: string}) => {
  if (props.src === 'http://image') {
    return Promise.resolve(right(
     Image.create({raw: new Blob(['TEST'], {type: 'image/png'})}).value as Image 
    ));
  }

  if (props.src === 'http://video') {
    return Promise.resolve(right(
     Video.create({raw: new Blob(['TEST'], {type: 'video/mp4'})}).getRight()
    ));
  }

  if (props.src === 'http://notfound') {
    return Promise.resolve(left(CommonUseCaseResult.InvalidValue.create({
      errorMessage: "Media src attribute is not set.",
      variable: "SRC",
      location: "FastHTMLParser.parse"
      })));
  }
    
})

const buildMockddHTML = (tag: string, src: string) => {
  return HTML.create({html:`<${tag} src="${src}"></${tag}>`}).getRight()
}

describe('FastHTMLParser', () => {
  it('should parse html with external image urls', async () => {
    const html = buildMockddHTML('img', 'http://image'); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;
    expect(result.value.html).toEqual('<img src="data:image/png;base64,VEVTVA==">'); // test data: TEST in base64: VEVTVA==
    expect(result.value.media.length).toBe(1);
    expect(result.value.media[0]).toBeInstanceOf(Image);
  })

  it('should parse html with image base64 urls', async () => {
    const html = buildMockddHTML('img', 'data:image/png;base64,VEVTVA=='); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;
    expect(result.value.html).toEqual('<img src="data:image/png;base64,VEVTVA==">');
    expect(result.value.media.length).toBe(1);
  })

  it('should parse html with external video urls', async () => {
    const html = buildMockddHTML('video', 'http://video'); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;
    expect(result.value.html).toEqual('<video src="data:video/mp4;base64,VEVTVA=="></video>'); // test data: TEST in base64: VEVTVA==
    expect(result.value.media.length).toBe(1);
    expect(result.value.media[0]).toBeInstanceOf(Video);
  })

  it('should parse html with video base64 urls', async () => {
    const html = buildMockddHTML('video', 'data:video/mp4;base64,VEVTVA=='); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;
    expect(result.value.html).toEqual('<video src="data:video/mp4;base64,VEVTVA=="></video>');
    expect(result.value.media.length).toBe(1);
  })

  it('should parse html with external image and base64 urls', async () => {
    const html = HTML.create({html:`<img src="http://image"><img src="data:image/png;base64,VEVTVA==">`}).getRight();
    const result = await fastHtmlParser.parse({html});
    expect(result.isRight()).toBeTruthy();
    if (result.isLeft()) return;
    expect(result.value.html).toEqual('<img src="data:image/png;base64,VEVTVA=="><img src="data:image/png;base64,VEVTVA==">');
    expect(result.value.media.length).toBe(2);
  })

  it('should return invalid value', async () => {
    const html = buildMockddHTML('img', 'http://notfound'); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isLeft()).toBeTruthy();
  })

  it('should fail to parse invalid base65', async () => {
    const html = buildMockddHTML('img', 'data:image/png;base64,'); 
    const result = await fastHtmlParser.parse({html});
    expect(result.isLeft()).toBeTruthy();
  })
})
