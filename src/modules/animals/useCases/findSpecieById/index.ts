import { FindSpecieByIdController } from "./findSpecieByIdController";
import { FindSpecieByIdUseCase } from "./findSpecieByIdUseCase";
import { specieRepo } from "../../repository";

const findSpecieByIdUseCase = new FindSpecieByIdUseCase(specieRepo);
const findSpecieByIdController = new FindSpecieByIdController(findSpecieByIdUseCase);

export { findSpecieByIdUseCase, findSpecieByIdController };
