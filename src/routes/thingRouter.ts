import express, { Request, Response } from 'express'
import * as thingModel from '../models/thing.model'
import Thing from '../types/thing'

const thingRouter = express.Router()

thingRouter.get('/', async (req: Request, res: Response) => {
  thingModel.findAllThings((err: Error | null, things?: Thing[]) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(200).json({ data: things })
  })
})

thingRouter.get('/:id', async (req: Request, res: Response) => {
  const thingId: number = parseInt(req.params.id)
  thingModel.findThingById(thingId, (err: Error | null, thing?: Thing) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    if (!thing) {
      return res.status(404).json({ message: 'Thing not found' })
    }
    return res.status(200).json({ data: thing })
  })
})

thingRouter.post('/', async (req: Request, res: Response) => {
  const thing: Thing = req.body
  thingModel.createThing(thing.name, (err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(200).json({ message: 'Thing created' })
  })
})

thingRouter.put('/:id', async (req: Request, res: Response) => {
  const thing: Thing = req.body
  thingModel.updateThing(thing, (err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(200).json({ message: 'Thing updated' })
  })
})

thingRouter.delete('/:id', async (req: Request, res: Response) => {
  const thingId: number = parseInt(req.params.id)
  thingModel.deleteThing(thingId, (err: Error | null, success: boolean) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    if (!success) {
      return res.status(404).json({ message: 'Thing not found' })
    }
    return res.status(200).json({ message: 'Thing deleted' })
  })
})

export default thingRouter
