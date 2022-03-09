import { createConnection } from 'typeorm'
import { Post } from './models/post'
import { User } from './models/user'
import { Comment } from './models/comment'

const sql = async () =>
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: ['migration/*.js'],
    entities: [Post, User, Comment],
  })

export default sql
