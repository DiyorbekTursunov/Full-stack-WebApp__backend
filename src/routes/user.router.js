import { Router } from "express";
import userController from "../controllers/user.controller.js";
import ChackToken from "../middlewares/chackToken.js";

const router = Router();
router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/", ChackToken, userController.GetUser);
router.get("/all", ChackToken, userController.GetAllUserForAdmin);
router.get("/:id", ChackToken, userController.GetUserByIdForAdmin);
router.put("/", ChackToken, userController.UpdateUserData);
router.delete("/:id", ChackToken, userController.DeleteUserForAdmin);

export default router;
