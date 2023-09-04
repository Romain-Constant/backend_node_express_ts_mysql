import express, { Request, Response } from 'express'
import * as thingModel from '../models/thing.model'
import * as thingController from '../controllers/thing.controller'
import Thing from '../types/thing'

const thingRouter = express.Router()

thingRouter.get('/', thingController.getAllThings)

thingRouter.get('/:id', thingController.getThingById)

thingRouter.post('/', thingController.createThing)

thingRouter.put('/:id', thingController.updateThing)

thingRouter.delete('/:id', thingController.deleteThing)

export default thingRouter
