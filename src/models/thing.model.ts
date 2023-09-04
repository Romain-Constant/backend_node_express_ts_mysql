import Thing from '../types/thing'
import connection from '../db-config'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export const findAllThings = async (): Promise<Thing[]> => {
  return new Promise<Thing[]>((resolve, reject) => {
    const queryString = 'SELECT * FROM thing'

    connection.query(queryString, (err, result) => {
      if (err) {
        reject(err)
        return
      } else {
        const rows = <RowDataPacket[]>result
        const things: Thing[] = []

        rows.forEach((row) => {
          const thing: Thing = {
            id: row.id,
            name: row.name
          }
          things.push(thing)
        })

        resolve(things)
      }
    })
  })
}

export const findThingById = async (thingId: number): Promise<Thing | null> => {
  return new Promise<Thing | null>((resolve, reject) => {
    const queryString = 'SELECT * FROM thing WHERE id = ?'

    connection.query(queryString, [thingId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        const row = (<RowDataPacket[]>result)[0]

        if (!row) {
          resolve(null) // Aucune chose trouvée, renvoie null comme thing
        } else {
          const thing: Thing = {
            id: row.id,
            name: row.name
          }
          resolve(thing)
        }
      }
    })
  })
}

export const createThing = async (name: string): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const queryString = 'INSERT INTO thing (name) VALUES (?)'

    connection.query(queryString, [name], (err, result) => {
      if (err) {
        reject(err)
        return
      }

      const { insertId } = result as ResultSetHeader
      resolve(insertId)
    })
  })
}

export const updateThing = async (thing: { id: number; name: string }): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const queryString = 'UPDATE thing SET name = ? WHERE id = ?'

    connection.query(queryString, [thing.name, thing.id], (err, result) => {
      if (err) {
        reject(err)
        return
      }

      const { affectedRows } = result as ResultSetHeader
      resolve(affectedRows)
    })
  })
}

export const deleteThing = async (id: number): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const queryString = 'DELETE FROM thing WHERE id = ?'

    connection.query(queryString, [id], (err, result) => {
      if (err) {
        reject(err)
        return
      }

      const { affectedRows } = result as ResultSetHeader
      resolve(affectedRows)
    })
  })
}
