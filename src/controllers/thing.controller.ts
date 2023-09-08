import { Request, Response } from 'express'
import Thing from 'types/thing'
import * as thingModel from '../models/thing.model'

const handleResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ message })
}

const handleUnexpectedError = (res: Response) => {
  return handleResponse(res, 500, 'An unexpected error occurred.')
}

export const getAllThings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const things: Thing[] = await thingModel.findAllThings()

    if (things.length === 0) {
      return handleResponse(res, 404, 'No things found')
    }

    return res.status(200).json({ data: things })
  } catch (err) {
    console.error(err)
    return handleUnexpectedError(res)
  }
}

export const getThingById = async (req: Request, res: Response): Promise<Response> => {
  const thingId: number = parseInt(req.params.id)
  try {
    const thing = await thingModel.findThingById(thingId)
    if (!thing) {
      return handleResponse(res, 404, 'Thing not found')
    }
    return res.status(200).json({ data: thing })
  } catch (err) {
    console.error(err)
    return handleUnexpectedError(res)
  }
}

export const createThing = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body
  try {
    if (!name) {
      return handleResponse(res, 400, '"name" field required')
    }
    await thingModel.createThing(name)
    return handleResponse(res, 200, 'Thing created.')
  } catch (err) {
    console.error(err)
    return handleUnexpectedError(res)
  }
}

export const updateThing = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body
  const id: number = parseInt(req.params.id)

  try {
    if (!id || !name) {
      return handleResponse(res, 400, '"id" and "name" fields required.')
    }

    const updatedRows = await thingModel.updateThing({ id, name })
    console.log(updatedRows)

    if (updatedRows === 0) {
      return handleResponse(res, 404, 'Thing not found.')
    }

    return handleResponse(res, 200, 'Thing updated.')
  } catch (err) {
    console.error(err)
    return handleUnexpectedError(res)
  }
}

export const deleteThing = async (req: Request, res: Response): Promise<Response> => {
  const idStr = req.params.id
  const id = parseInt(idStr)

  try {
    if (!id) {
      return handleResponse(res, 400, '"id" field required.')
    }

    const deletedRows = await thingModel.deleteThing(id)

    if (deletedRows === 0) {
      return handleResponse(res, 404, 'Thing not found.')
    }

    return handleResponse(res, 200, 'Thing deleted.')
  } catch (err) {
    console.error(err)
    return handleUnexpectedError(res)
  }
}
