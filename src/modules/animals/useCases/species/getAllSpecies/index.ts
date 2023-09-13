import { GetAllSpeciesController } from "./getAllSpeciesController";
import { specieRepo } from "../../../repository";
import { GetAllSpeciesUseCase } from "./getAllSpeciesUseCase";

const getAllSpeciesUseCase = new GetAllSpeciesUseCase(specieRepo);
const getAllSpeceisController = new GetAllSpeciesController(getAllSpeciesUseCase);

export { getAllSpeceisController };
