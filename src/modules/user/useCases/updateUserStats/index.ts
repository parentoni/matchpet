import { userRepo } from "../../repository";
import { UpdateUserStatsUseCase } from "./updateUserStatsUseCase";

const updateUserStatsUseCase = new UpdateUserStatsUseCase(userRepo);
export { updateUserStatsUseCase };
