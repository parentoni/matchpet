import { AfterAnimalCreated } from "./afterAnimalCreated";
import { updateUserStatsUseCase } from "../../user/useCases/updateUserStats";

new AfterAnimalCreated(updateUserStatsUseCase);
