import { CountFilterAnimalsUseCase } from "./countFilterAnimalsUseCase";
import { CountFilterAnimaslsController } from "./countFilterAnimalsController";
import { animalRepo } from "../../../repository";

const countFilterAnimalsUseCase = new CountFilterAnimalsUseCase(animalRepo);
const countFilterAnimalsController = new CountFilterAnimaslsController(countFilterAnimalsUseCase);

export { countFilterAnimalsController, countFilterAnimalsUseCase };
