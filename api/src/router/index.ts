import { Router } from 'express'

const router = Router()

// routes
router.get('/ping', async (req, res, next) => {
  res.status(200).json({ success: true })
})

export default router
