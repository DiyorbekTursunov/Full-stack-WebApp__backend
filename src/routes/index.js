import { Router } from "express";
import adminRouter from "./admin.router.js"; 
import userRouter from './user.router.js'

const router = Router()
router.use('/admin', adminRouter)
router.use('/users', userRouter)

export default router