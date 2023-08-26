import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createSpeciesController } from "../../../useCases/createSpecies";
import { speciesRouter } from "./species";
import { createAnimalListingController } from "../../../useCases/createAnimalListing";

const animalsRouter = express.Router();

animalsRouter.use("/species", speciesRouter);

animalsRouter.post("/new", middleware.authenticated(), (req, res) => createAnimalListingController.execute(req, res));
export { animalsRouter };
