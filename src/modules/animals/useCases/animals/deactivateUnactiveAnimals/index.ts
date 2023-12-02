import { updateUserStatsUseCase } from "../../../../user/useCases/updateUserStats";
import { animalRepo } from "../../../repository";
import { DeactivateUnactiveAnimalsController } from "./deactivateUnactiveAnimalsController";
import { DeactivateUnactiveAnimalsUseCase } from "./deactivateUnactiveAnimalsUseCase";

const deactivateUnactiveAnimalsUseCase = new DeactivateUnactiveAnimalsUseCase(updateUserStatsUseCase, animalRepo)
const deactivateUnactiveAnimalsController = new DeactivateUnactiveAnimalsController(deactivateUnactiveAnimalsUseCase)
export {deactivateUnactiveAnimalsController}