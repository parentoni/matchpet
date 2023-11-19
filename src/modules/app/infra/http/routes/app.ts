import { Router } from "express";
import { statusController } from "../../../useCases/status";
import { appStatsController } from "../../../useCases/stats";
import { sendEmailUseCase } from "../../../../notifications/useCase/sendEmail";

const appRouter = Router()

appRouter.get('/status', (req, res) => statusController.execute(req,res))
appRouter.get('/stats', (req, res) => appStatsController.execute(req, res))
appRouter.get('/teste', async (req, res) => {
  const resp = await sendEmailUseCase.execute({source: 'nao-responda@matchpet.org', recepient: 'parentoni.arthur@gmail.com', html_body: '<h1>oiii</h1>', subject: 'TESTE'})
  console.log(resp)
  res.sendStatus(200)
})
export {appRouter}