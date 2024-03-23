import { RenderImageUseCase } from "./renderImageUseCase";
import { htmlParser } from "../../services";

const renderImageUseCase = new RenderImageUseCase(htmlParser);

export { renderImageUseCase }
