import { createApp } from '../index'
import request from 'supertest'
import { Product } from '../models/product'

describe('product', function () {
  let app

  beforeAll(async () => {
    app = await createApp()

    // create test data
    await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        Product.save(
          Product.create({
            id: i,
            title: `Product ${i}`,
            description: `description ${i}`,
            price: i,
            img: `https://loremflickr.com/300/150/${i}`,
          }),
        ),
      ),
    )
  })

  it('should get a list of products', async () => {
    const res = await request(app).get('/product').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBeTruthy()
  })

  it('should fail /cart for missing "cart"', async () => {
    const res = await request(app).post('/product/cart').send({
      something: 'anything',
    })
    expect(res.statusCode).toEqual(400)
  })

  it('should be able to post /cart to get prices, calculate the correct price / shipping', async () => {
    jest
      .spyOn(Product, 'find')
      .mockImplementationOnce(() => {
        return Promise.resolve([
          {
            id: 1,
            title: 'Product 1',
            description: 'description 1',
            price: 1,
          },
          {
            id: 2,
            title: 'Product 2',
            description: 'description 1',
            price: 2,
          },
        ] as any)
      })
      .mockImplementationOnce(() => {
        return Promise.resolve([
          {
            id: 1,
            title: 'Product 1',
            description: 'description 1',
            price: 100,
          },
          {
            id: 2,
            title: 'Product 2',
            description: 'description 1',
            price: 200,
          },
        ] as any)
      })
    let res
    res = await request(app)
      .post('/product/cart')
      .send({
        cart: [
          {
            id: 1,
            title: 'Product 1',
            description: 'description 1',
            price: 1,
            quantity: 5,
          },
          {
            id: 2,
            title: 'Product 2',
            description: 'description 1',
            price: 2,
            quantity: 5,
          },
        ],
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      shipping: 10,
      total: 25,
      totalPrice: 15,
    })

    res = await request(app)
      .post('/product/cart')
      .send({
        cart: [
          {
            id: 1,
            title: 'Product 1',
            description: 'description 1',
            price: 1,
            quantity: 50,
          },
          {
            id: 2,
            title: 'Product 2',
            description: 'description 1',
            price: 2,
            quantity: 50,
          },
        ],
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject({
      shipping: 20,
      total: 15020,
      totalPrice: 15000,
    })
  })
})
