import { AfterAnimalCreated } from "./afterAnimalCreated";
import { updateUserStatsUseCase } from "../../user/useCases/updateUserStats";
import { AfterAnimalStatusChanged } from "./afterAnimalStatusChanged";
import { AfterAnimalEdited } from "./afterAnimalEdited";
import { renovateLastModifiedAtUseCase } from "../useCases/animals/renovateLastModifiedAt";
import { AfterAnimalClicked } from "./afterAnimalClicked";
import { updateClickedCounterUseCase } from "../useCases/animals/updateClickedCounter";

new AfterAnimalCreated(updateUserStatsUseCase);
new AfterAnimalStatusChanged(updateUserStatsUseCase);
new AfterAnimalEdited(renovateLastModifiedAtUseCase);
new AfterAnimalClicked(updateClickedCounterUseCase);
