import { RenderHTMLController } from "./renderHTMLController";
import { renderImageUseCase } from "../renderImage";

const renderHtmlController = new RenderHTMLController(renderImageUseCase);

export { renderHtmlController };
