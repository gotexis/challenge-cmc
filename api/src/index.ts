import { config as configEnv } from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router'
import sql from './sql.db'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { ApolloServer } from 'apollo-server-express'
import { UserResolver } from './resolvers/user'
import { buildSchema } from 'type-graphql'
import { createPostLoader } from './loaders/post'
import { createCommentLoader } from './loaders/comment'
import { createUserLoader } from './loaders/user'

configEnv()

const port = process.env.PORT || 4000

export const createApp = async () => {
  // connect to db
  await sql()
  // pre create app scripts

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      postLoader: createPostLoader(),
      commentLoader: createCommentLoader(),
    }),
  })

  await apolloServer.start()

  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use('/', router)

  apolloServer.applyMiddleware({
    path: '/graphql',
    app,
    cors: false,
  })

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
