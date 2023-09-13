import { CreateSpecieUseCase } from "./createSpeciesUseCase";
import { CreateSpeciesController } from "./createSpeciesController";
import { SpecieRepo } from "../../../repository/implementations/speciesRepo";
import { categoryRepo, specieRepo } from "../../../repository";

const createUserUseCase = new CreateSpecieUseCase(specieRepo, categoryRepo);
const createSpeciesController = new CreateSpeciesController(createUserUseCase);

export { createSpeciesController };
