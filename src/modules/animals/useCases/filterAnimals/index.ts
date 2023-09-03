import { FilterAnimalsUseCase } from "./filterAnimalsUseCase";
import { FilterAnimaslsController } from "./filterAnimalsController";
import { animalRepo } from "../../repository";

const filterAnimalsUseCase = new FilterAnimalsUseCase(animalRepo)
const filterAnimalsController = new FilterAnimaslsController(filterAnimalsUseCase)

export {filterAnimalsUseCase, filterAnimalsController}