import { CreateSpecieUseCase } from "./createSpeciesUseCase";
import { CreateSpeciesController } from "./createSpeciesController";
import { SpecieRepo } from "../../repository/implementations/speciesRepo";
import { specieRepo } from "../../repository";

const createUserUseCase = new CreateSpecieUseCase(specieRepo);
const createSpeciesController = new CreateSpeciesController(createUserUseCase);

export { createSpeciesController };
