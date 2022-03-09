import { Request, Response, Router } from 'express'
import { CartCaculateRequest, CartCaculateResponse } from '@starter/common/cart'
import { Product } from '../models/product'

const router = Router()

// routes
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

// routes
router.post('/cart', async (req: Request<CartCaculateRequest>, res: Response<CartCaculateResponse>) => {
  const { cart, country } = req.body
  // fetch all related products
  const products = await Product.find({
    where: cart.map((item) => ({ id: item.id })),
  })
  const transformed = Object.assign({}, ...products.map((item) => ({ [item.id]: item })))

  // override prices coming from the frontend.
  const safeProducts = cart.map((item) => ({
    ...item, // contains quantity
    ...transformed[item.id], // contains the price
  }))

  const totalPrice = safeProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = totalPrice > 50 ? 20 : 10
  res.status(200).json({
    totalPrice,
    shipping,
    total: totalPrice + shipping,
  })
})

export default router
