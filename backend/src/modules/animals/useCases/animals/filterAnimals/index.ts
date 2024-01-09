import { FilterAnimalsUseCase } from "./filterAnimalsUseCase";
import { FilterAnimaslsController } from "./filterAnimalsController";
import { animalRepo } from "../../../repository";
import { updateViewCounterUseCase } from "../updateVIewCounter";

const filterAnimalsUseCase = new FilterAnimalsUseCase(animalRepo, updateViewCounterUseCase);
const filterAnimalsController = new FilterAnimaslsController(filterAnimalsUseCase);

export { filterAnimalsUseCase, filterAnimalsController };
