import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createSpeciesController } from "../../../useCases/createSpecies";
import { speciesRouter } from "./species";
import { createAnimalListingController } from "../../../useCases/createAnimalListing";
import { getAnimalListingByIdController } from "../../../useCases/getAnimalListingById";
import { reccommendSimilarAnimalsController } from "../../../useCases/reccommendSimilarAnimals";
import { filterAnimalsController } from "../../../useCases/filterAnimals";

const animalsRouter = express.Router();

animalsRouter.use("/species", speciesRouter);

animalsRouter.post("/new", middleware.authenticated(), (req, res) => createAnimalListingController.execute(req, res));
animalsRouter.post("/filter", (req, res) => filterAnimalsController.execute(req, res));

animalsRouter.get("/:id", (req, res) => getAnimalListingByIdController.execute(req, res));
animalsRouter.get("/:id/similar", (req, res) => reccommendSimilarAnimalsController.execute(req, res));

export { animalsRouter };
