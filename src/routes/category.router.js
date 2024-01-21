import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import Chaktoken from "../middlewares/chackToken.js";

const router = Router();

router.post("/", Chaktoken, categoryController.CreateCategory);
router.get("/", categoryController.GetAllCategory);
router.get("/:id", categoryController.GetAllCategoryById);
router.put("/:id", Chaktoken, categoryController.UpdateCategory);
router.delete("/:id", Chaktoken, categoryController.DeleteCategory);

export default router;
