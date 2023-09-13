import express from 'express'
import { middleware } from '../../../../../shared/infra/http'
import { createCategoryController } from '../../../useCases/category/createCategory'

const categoryRouter = express.Router()

categoryRouter.post('/new', middleware.authenticated(), (req, res) => createCategoryController.execute(req, res))
export {categoryRouter}