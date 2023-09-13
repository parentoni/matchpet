import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { categoryRepo } from "../../../repository";

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export {createCategoryController}