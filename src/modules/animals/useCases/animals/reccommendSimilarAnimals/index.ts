import { ReccommendSimilarAnimalsController } from "./reccommendSimilarAnimalsController";
import { ReccommendSimilarAnimalsUseCase } from "./reccommendSimilarAnimalsUseCase";
import { animalRepo } from "../../../repository";
const reccommendSimilarAnimalsUseCase = new ReccommendSimilarAnimalsUseCase(animalRepo);
const reccommendSimilarAnimalsController = new ReccommendSimilarAnimalsController(reccommendSimilarAnimalsUseCase);

export { reccommendSimilarAnimalsController, reccommendSimilarAnimalsUseCase };
