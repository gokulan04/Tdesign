import express from "express";
import {
    createTshirtModel,
    getAllTshirtModels,
    getTshirtModelById,
    updateTshirtModel,
    deleteTshirtModel
} from "../controllers/tShirtModelController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createTshirtModel);
router.get("/", protect, authorize("admin", "user"), getAllTshirtModels);
router.get("/:id", protect, authorize("admin", "user"), getTshirtModelById);
router.put("/:id", protect, authorize("admin"), updateTshirtModel);
router.delete("/:id", protect, authorize("admin"), deleteTshirtModel);

export default router;
