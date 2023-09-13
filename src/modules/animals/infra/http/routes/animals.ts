import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createSpeciesController } from "../../../useCases/createSpecies";
import { speciesRouter } from "./species";
import { createAnimalListingController } from "../../../useCases/createAnimalListing";
import { getAnimalListingByIdController } from "../../../useCases/getAnimalListingById";
import { reccommendSimilarAnimalsController } from "../../../useCases/reccommendSimilarAnimals";
import { filterAnimalsController } from "../../../useCases/filterAnimals";
import { uploadAnimalImageController } from "../../../useCases/uploadAnimalImage";
import fileUpload from "express-fileupload";
import { categoryRouter } from "./category";

const animalsRouter = express.Router();

animalsRouter.use("/species", speciesRouter);
animalsRouter.use("/category", categoryRouter);

animalsRouter.post("/new", middleware.authenticated(), (req, res) => createAnimalListingController.execute(req, res));
animalsRouter.post("/filter", (req, res) => filterAnimalsController.execute(req, res));
animalsRouter.post("/image/upload",middleware.authenticated(), fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}), (req, res) => uploadAnimalImageController.execute(req, res))

animalsRouter.get("/:id", (req, res) => getAnimalListingByIdController.execute(req, res));
animalsRouter.get("/:id/similar", (req, res) => reccommendSimilarAnimalsController.execute(req, res));

export { animalsRouter };
