import { animalRepo } from "../../../animals/repository";
import { GetUserAnimalsStatsController } from "./getUserAnimalsStatsController";
import { GetUserAnimalsStatsUseCase } from "./getUserAnimalsStatsUseCase";

const getUserAnimalsStatsUseCase = new GetUserAnimalsStatsUseCase(animalRepo)
const getUserAnimalsStatsController = new GetUserAnimalsStatsController(getUserAnimalsStatsUseCase)

export { getUserAnimalsStatsController }