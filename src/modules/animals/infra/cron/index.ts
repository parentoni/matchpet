import { CronJob } from "cron";
import { deactivateUnactiveAnimalsController } from "../../useCases/animals/deactivateUnactiveAnimals";

CronJob.from({cronTime: deactivateUnactiveAnimalsController.cronTime, onTick: () => deactivateUnactiveAnimalsController.onTick(), start: true})
