import { Router } from "express";
import { renderHtmlController } from "../../../useCases/renderHTML";

const renderRouter = Router();

renderRouter.post("/", (req, res) => renderHtmlController.execute(req, res));

export { renderRouter }
