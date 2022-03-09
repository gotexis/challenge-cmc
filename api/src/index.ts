import { config as configEnv } from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productRouter from './router/product'
import sql from './sql.db'

configEnv()

const port = process.env.PORT || 4000

export const createApp = async () => {
  // connect to db
  await sql()
  // pre create app scripts

  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use('/product', productRouter)

  // error handling middleware
  app.use((e, req, res, next) => {
    res.status(400).json({ error: e })
  })

  return app
}

// start the Express server
if (process.env.NODE_ENV !== 'test') {
  createApp().then((app) => {
    app.listen(port, () => {
      console.log(`API started at http://localhost:${port}`)
    })
  })
}
