import { AfterAnimalCreated } from "./afterAnimalCreated";
import { updateUserStatsUseCase } from "../../user/useCases/updateUserStats";
import { AfterAnimalStatusChanged } from "./afterAnimalStatusChanged";

new AfterAnimalCreated(updateUserStatsUseCase);
new AfterAnimalStatusChanged(updateUserStatsUseCase)