import { Router } from "express";
import adminRouter from "./admin.router.js"; 
import userRouter from './user.router.js'
import categoryRouter from './category.router.js'

const router = Router()
router.use('/admin', adminRouter)
router.use('/users', userRouter)
router.use('/category', categoryRouter)

export default router