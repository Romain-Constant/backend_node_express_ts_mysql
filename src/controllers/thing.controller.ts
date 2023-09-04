import { Request, Response } from 'express'
import Thing from '../types/thing'
import * as thingModel from '../models/thing.model'

export const getAllThings = async (req: Request, res: Response) => {
  try {
    const things = await thingModel.findAllThings()
    return res.status(200).json({ data: things })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getThingById = async (req: Request, res: Response) => {
  const thingId: number = parseInt(req.params.id)
  try {
    const thing = await thingModel.findThingById(thingId)
    if (!thing) {
      return res.status(404).json({ message: 'Thing not found' })
    }
    return res.status(200).json({ data: thing })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const createThing = async (req: Request, res: Response) => {
  const { name } = req.body
  try {
    if (!name) {
      return res.status(400).json({ message: '"name" field required' })
    } else {
      await thingModel.createThing(name)

      return res.status(200).json({ message: 'Thing created.' })
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const updateThing = async (req: Request, res: Response) => {
  const { name } = req.body
  const id: number = parseInt(req.params.id) // Extract the 'id' as a string from req.params

  try {
    if (!id || !name) {
      return res.status(400).json({ message: '"id" and "name" fields required.' })
    }

    const updatedRows = await thingModel.updateThing({ id, name })
    console.log(updatedRows)

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Thing not found.' })
    }

    return res.status(200).json({ message: 'Thing updated.' })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteThing = async (req: Request, res: Response) => {
  const idStr = req.params.id // Extract the 'id' as a string from req.params
  const id = parseInt(idStr)

  try {
    if (!id) {
      return res.status(400).json({ message: '"id" field required.' })
    }

    const deletedRows = await thingModel.deleteThing(id)

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Thing not found.' })
    }

    return res.status(200).json({ message: 'Thing deleted.' })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
