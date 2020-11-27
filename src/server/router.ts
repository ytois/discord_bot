import { Router } from 'express'

const router = Router()

router.get('/api/test', (_req, res) => {
  res.send('status: 200')
})

export default router
