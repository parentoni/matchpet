import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createSpeciesController } from "../../../useCases/species/createSpecies";
import { getAllSpeceisController } from "../../../useCases/species/getAllSpecies";
import { findSpecieByIdController } from "../../../useCases/species/findSpecieById";

const speciesRouter = express.Router();
//!todo, add admin verification
speciesRouter.post("/create", middleware.authenticated(), (req, res) => createSpeciesController.execute(req, res));

speciesRouter.get("/all", (req, res) => getAllSpeceisController.execute(req, res));
speciesRouter.get("/:id", (req, res) => findSpecieByIdController.execute(req, res));

export { speciesRouter };
