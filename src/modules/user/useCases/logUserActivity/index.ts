import { userRepo } from "../../repository";
import { LogUserActivityUseCase } from "./logUserActivityUseCase";

const logUserLastActivityUseCase = new LogUserActivityUseCase(userRepo);

export { logUserLastActivityUseCase };
