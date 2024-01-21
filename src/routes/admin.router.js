import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import ChackToken from '../middlewares/chackToken.js'

const router = Router()
router.post('/register', adminController.Register)
router.post('/login', adminController.Login)
router.get('/', ChackToken , adminController.GetAdmin)
router.put('/', ChackToken , adminController.UpdateAdminData)

export default router