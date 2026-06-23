import express from "express";
import {
    createDesign,
    getAllDesigns,
    getDesignById,
    updateDesign,
    deleteDesign
} from "../controllers/designController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "user"), createDesign);
router.get("/", protect, authorize("admin", "user"), getAllDesigns);
router.get("/:id", protect, authorize("admin", "user"), getDesignById);
router.put("/:id", protect, authorize("admin", "user"), updateDesign);
router.delete("/:id", protect, authorize("admin", "user"), deleteDesign);

export default router;