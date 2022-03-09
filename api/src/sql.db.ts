import { createConnection } from 'typeorm'
import { Product } from './models/product'

const sql = async () => {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    // logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: ['migration/*.js'],
    entities: [Product],
  })

  // create test data
  await Promise.all(
    Array.from({ length: 20 }, (_, i) =>
      Product.save(
        Product.create({
          title: `Product ${i}`,
          description: `description ${i}`,
          price: i,
          img: `https://loremflickr.com/300/150/${i}`,
        }),
      ),
    ),
  )
}

export default sql
