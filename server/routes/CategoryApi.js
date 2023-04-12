import { Router } from "express";
import * as CategoryController from "../controller/CategoryController.js";

const router = Router();

router.delete("/:id", CategoryController.destroy);
router.post("/", CategoryController.create);
router.patch("/:id", CategoryController.update);


export default router;
