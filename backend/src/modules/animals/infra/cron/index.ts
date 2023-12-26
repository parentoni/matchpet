import { CronJob } from "cron";
import { deactivateUnactiveAnimalsController } from "../../useCases/animals/deactivateUnactiveAnimals";
import { notificateRenovationPossibilityController } from "../../useCases/animals/notificateRenovationPossibility";

// I dont know if this should be here😭. Maybe pass this to user

CronJob.from({cronTime: deactivateUnactiveAnimalsController.cronTime, onTick: () => deactivateUnactiveAnimalsController.onTick(), start: true})
CronJob.from({cronTime: notificateRenovationPossibilityController.cronTime, onTick: () => notificateRenovationPossibilityController.onTick(), start: true})
