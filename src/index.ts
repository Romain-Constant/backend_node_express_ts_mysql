import dotenv from 'dotenv'

import express from 'express'
import thingRouter from './routes/thingRouter'
dotenv.config()

const app = express()

app.use(express.json())
app.use('/things', thingRouter)

app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
})
