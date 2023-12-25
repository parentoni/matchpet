import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createSpeciesController } from "../../../useCases/species/createSpecies";
import { speciesRouter } from "./species";
import { createAnimalListingController } from "../../../useCases/animals/createAnimalListing";
import { getAnimalListingByIdController } from "../../../useCases/animals/getAnimalListingById";
import { reccommendSimilarAnimalsController } from "../../../useCases/animals/reccommendSimilarAnimals";
import { filterAnimalsController } from "../../../useCases/animals/filterAnimals";
import { uploadAnimalImageController } from "../../../../app/useCases/uploadlImage";
import fileUpload from "express-fileupload";
import { categoryRouter } from "./category";
import { editAnimalController } from "../../../useCases/animals/editAnimal";
import { renovateLastModifiedAtController } from "../../../useCases/animals/renovateLastModifiedAt";
import { createAnimalComplaintController } from "../../../useCases/animals/createAnimalComplaint";
import { countFilterAnimalsController } from "../../../useCases/animals/countFilterResults";

const animalsRouter = express.Router();

animalsRouter.use("/species", speciesRouter);
animalsRouter.use("/categories", categoryRouter);

animalsRouter.post("/new", middleware.authenticated(), (req, res) => createAnimalListingController.execute(req, res));
animalsRouter.post("/filter", (req, res) => filterAnimalsController.execute(req, res));
animalsRouter.post("/filter/count", (req, res) => countFilterAnimalsController.execute(req, res));
animalsRouter.post("/renovate", middleware.authenticated(), (req, res) => renovateLastModifiedAtController.execute(req, res));
animalsRouter.post('/:id/complaint', (req, res) => createAnimalComplaintController.execute(req, res))

animalsRouter.get("/:id", (req, res) => getAnimalListingByIdController.execute(req, res));
animalsRouter.get("/:id/similar", (req, res) => reccommendSimilarAnimalsController.execute(req, res));

animalsRouter.put("/:id", middleware.authenticated(), (req, res) => editAnimalController.execute(req, res));
export { animalsRouter };
