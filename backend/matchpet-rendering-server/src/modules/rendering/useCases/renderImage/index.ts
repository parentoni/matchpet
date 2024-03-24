import { RenderImageUseCase } from "./renderImageUseCase";
import { drawHTML, htmlParser } from "../../services";

const renderImageUseCase = new RenderImageUseCase(htmlParser, drawHTML);

export { renderImageUseCase }
