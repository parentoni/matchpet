import { Router } from "express";
import { statusController } from "../../../useCases/status";
import { appStatsController } from "../../../useCases/stats";
import { sendEmailUseCase } from "../../../../notifications/useCase/sendEmail";
import { middleware } from "../../../../../shared/infra/http";
import fileUpload from "express-fileupload";
import { uploadAnimalImageController } from "../../../useCases/uploadlImage";

const appRouter = Router();

appRouter.get("/status", (req, res) => statusController.execute(req, res));
appRouter.get("/stats", (req, res) => appStatsController.execute(req, res));

appRouter.post("/image/upload", middleware.authenticated(), fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }), (req, res) =>
  uploadAnimalImageController.execute(req, res)
);
export { appRouter };
