import puppeteer, { ScreenshotOptions } from "puppeteer";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { left } from "../../../../shared/core/result";
import { DrawImageResponse, DrawImageProps, IDrawHTML } from "../IDrawHTML";
import { Image } from "../../domain/image";

/**
 * 
 * @class PuppeteerDraw
 * @classdesc Class that draws html code.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class PuppeteerDraw implements IDrawHTML {

  async image(props: DrawImageProps): DrawImageResponse {
    // defines the browser and page.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(props.html.value.toString());
    await page.setViewport({ width: props.width, height: props.height });

    const selectedType = props.type.split('/')[1] || '';
    if (!['png', 'jpeg', 'webp'].includes(selectedType)) {
      // close browser and page
      await page.close()
      await browser.close();

      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Invalid export mime type. only png, jpeg and webp are supported.",
        variable: "type",
        location: "PuppeteerDraw.image",
      }))
    }

    // take a screenshot of the page
    const screenshot = await page.screenshot({
      type: selectedType as ScreenshotOptions['type'],
      quality: selectedType !== 'png'?100:undefined,
      fullPage: true,
    });

    // close browser and page
    await page.close();
    await browser.close();

    // create image from screenshot
    const blob = new Blob([screenshot], { type: props.type });
    const image = Image.create({ raw: blob });
    return image
  }
}
