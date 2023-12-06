import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createCategoryController } from "../../../useCases/category/createCategory";
import { getAllCategoriesController } from "../../../useCases/category/getAllCategories";

const categoryRouter = express.Router();

categoryRouter.post("/new", middleware.authenticated(), (req, res) => createCategoryController.execute(req, res));

categoryRouter.get("/all", (req, res) => getAllCategoriesController.execute(req, res));

export { categoryRouter };
