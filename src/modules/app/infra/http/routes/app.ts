import { Router } from "express";
import { statusController } from "../../../useCases/status";
import { appStatsController } from "../../../useCases/stats";

const appRouter = Router()

appRouter.get('/status', (req, res) => statusController.execute(req,res))
appRouter.get('/stats', (req, res) => appStatsController.execute(req, res))

export {appRouter}