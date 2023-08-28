import express, { Express, Request, Response } from 'express'

const app: Express = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.listen(5050, async () => {
  console.log('Server is running at http://localhost:5050')
})
