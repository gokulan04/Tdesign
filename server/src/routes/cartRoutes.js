import express from "express";
import {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the protect middleware to all routes below this line
router.use(protect);

router.route("/")
    .get(getCart)
    .post(addToCart)
    .delete(clearCart);

router.route("/items/:itemId")
    .put(updateCartItemQuantity)
    .delete(removeFromCart);

export default router;
