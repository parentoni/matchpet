import { GetAllCategoriesUseCase } from "./getAllCategoriesUseCase";
import { GetAllCategoriesController } from "./getAllCategoriesController";
import { categoryRepo } from "../../../repository";

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo)
const getAllCategoriesController = new GetAllCategoriesController(getAllCategoriesUseCase)

export { getAllCategoriesController}