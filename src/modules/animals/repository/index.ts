import { AnimalRepo } from "./implementations/animalRepo";
import { SpecieRepo } from "./implementations/speciesRepo";

const specieRepo = new SpecieRepo();
const animalRepo = new AnimalRepo();

export { specieRepo, animalRepo };
