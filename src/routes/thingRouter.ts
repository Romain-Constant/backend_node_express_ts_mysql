import express from 'express'
import * as thingController from '../controllers/thing.controller'

const thingRouter = express.Router()

thingRouter.get('/', thingController.getAllThings)

thingRouter.get('/:id', thingController.getThingById)

thingRouter.post('/', thingController.createThing)

thingRouter.put('/:id', thingController.updateThing)

thingRouter.delete('/:id', thingController.deleteThing)

export default thingRouter
