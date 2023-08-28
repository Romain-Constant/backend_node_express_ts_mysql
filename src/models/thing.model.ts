import Thing from '../types/thing'
import connection from '../db-config'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export const findAllThings = (callback: (err: Error | null, things?: Thing[]) => void) => {
  const queryString = 'SELECT * FROM thing'

  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, [])
      return
    }

    const rows = <RowDataPacket[]>result
    const things: Thing[] = []

    rows.forEach((row) => {
      const thing: Thing = {
        id: row.id,
        name: row.name
      }
      things.push(thing)
    })

    callback(null, things)
  })
}

export const findThingById = (thingId: number, callback: (err: Error | null, thing?: Thing) => void) => {
  const queryString = 'SELECT * FROM thing WHERE id = ?'

  connection.query(queryString, [thingId], (err, result) => {
    if (err) {
      callback(err)
      return
    }

    const row = (<RowDataPacket[]>result)[0]

    if (!row) {
      callback(null) // Aucune chose trouvée, renvoie null comme thing
      return
    }

    const thing: Thing = {
      id: row.id,
      name: row.name
    }
    callback(null, thing)
  })
}

export const createThing = (name: string, callback: (err: Error | null, insertId?: number) => void) => {
  const queryString = 'INSERT INTO thing (name) VALUES (?)'

  //La fonction createThing est définie avec trois paramètres : name (de type string), callback (de type Function), et callback est le callback qui sera appelé une fois que l'insertion est terminée.

  connection.query(queryString, [name], (err, result) => {
    if (err) {
      callback(err)
    }

    const { insertId } = result as ResultSetHeader //ResultSetHeader is a type from mysql2 and it has an insertId property
    callback(null, insertId) //la fonction de rappel est appelée avec null comme premier argument (pour indiquer l'absence d'erreur) et l'ID de l'insertion (insertId) comme deuxième argument.
  })
}

export const updateThing = (thing: Thing, callback: (err: Error | null) => void) => {
  const queryString = 'UPDATE thing SET name = ? WHERE id = ?'

  connection.query(queryString, [thing.name, thing.id], (err) => {
    if (err) {
      callback(err)
      return
    }

    callback(null)
  })
}

export const deleteThing = (thingId: number, callback: (err: Error | null, success: boolean) => void) => {
  const queryString = 'DELETE FROM thing WHERE id = ?'

  connection.query(queryString, [thingId], (err, result) => {
    if (err) {
      callback(err, false)
      return
    }

    if ((result as ResultSetHeader).affectedRows === 0) {
      callback(null, false)
      return
    }

    callback(null, true)
  })
}
