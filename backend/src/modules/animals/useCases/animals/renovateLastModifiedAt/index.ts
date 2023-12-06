import { animalRepo } from "../../../repository";
import { RenovateLastModifiedAtController } from "./renovateLastModifiedAtController";
import { RenovateLastModifiedAtUseCase } from "./renovateLastModifiedAtUseCase";

const renovateLastModifiedAtUseCase = new RenovateLastModifiedAtUseCase(animalRepo)
const renovateLastModifiedAtController = new RenovateLastModifiedAtController(renovateLastModifiedAtUseCase)

export {renovateLastModifiedAtUseCase, renovateLastModifiedAtController}