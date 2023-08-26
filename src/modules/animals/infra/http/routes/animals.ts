import express from 'express'
import { middleware } from '../../../../../shared/infra/http'
import { createSpeciesController } from '../../../useCases/createSpecies'
import { speciesRouter } from './species'

const animalsRouter = express.Router()

animalsRouter.use("/species", speciesRouter)

export {animalsRouter}