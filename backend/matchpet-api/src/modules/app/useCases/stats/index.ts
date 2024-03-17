import { AppStatsController } from "./AppStatsController";
import { AppStatsUseCase } from "./AppStatsUseCase";
import { userRepo } from "../../../user/repository";

const appStatsUseCase = new AppStatsUseCase(userRepo);
const appStatsController = new AppStatsController(appStatsUseCase);

export { appStatsController };
