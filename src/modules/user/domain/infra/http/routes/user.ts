import express from 'express'
import { getUserInfoController } from '../../../../useCases/getUserInfo'

const userRouter = express.Router()

userRouter.get('/:id/contact', (req, res) => getUserInfoController.execute(req, res))

export {userRouter }