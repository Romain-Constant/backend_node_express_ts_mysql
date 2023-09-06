import Thing from '../types/thing'
import connection from '../db-config'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

// Fonction générique pour exécuter une requête SQL et renvoyer un résultat typé
const executeQuery = <T>(queryString: string, params: (number | string)[] = []): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    connection.query(queryString, params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result as T)
      }
    })
  })
}

export const findAllThings = async (): Promise<Thing[]> => {
  const queryString = 'SELECT * FROM thing'
  const rows = await executeQuery<RowDataPacket[]>(queryString)
  const things: Thing[] = rows.map((row) => ({
    id: row.id,
    name: row.name
  }))
  return things
}

export const findThingById = async (thingId: number): Promise<Thing | null> => {
  const queryString = 'SELECT * FROM thing WHERE id = ?'
  const rows = await executeQuery<RowDataPacket[]>(queryString, [thingId])
  if (rows.length === 0) {
    return null
  }
  const row = rows[0]
  const thing: Thing = {
    id: row.id,
    name: row.name
  }
  return thing
}

export const createThing = async (name: string): Promise<number> => {
  const queryString = 'INSERT INTO thing (name) VALUES (?)'
  const result = await executeQuery<ResultSetHeader>(queryString, [name])
  return result.insertId
}

export const updateThing = async (thing: { id: number; name: string }): Promise<number> => {
  const queryString = 'UPDATE thing SET name = ? WHERE id = ?'
  const result = await executeQuery<ResultSetHeader>(queryString, [thing.name, thing.id])
  return result.affectedRows
}

export const deleteThing = async (id: number): Promise<number> => {
  const queryString = 'DELETE FROM thing WHERE id = ?'
  const result = await executeQuery<ResultSetHeader>(queryString, [id])
  return result.affectedRows
}
