import { AnimalRepo } from "./implementations/animalRepo";
import { CategoryRepo } from "./implementations/categoryRepo";
import { SpecieRepo } from "./implementations/speciesRepo";

const specieRepo = new SpecieRepo();
const animalRepo = new AnimalRepo();
const categoryRepo = new CategoryRepo();
export { specieRepo, animalRepo, categoryRepo };
