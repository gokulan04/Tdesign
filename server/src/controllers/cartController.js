import Cart from "../models/Cart.js";

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id; // Comes from the 'protect' middleware
        
        // Find user's cart and populate references to show actual Tshirt and Design details
        let cart = await Cart.findOne({ userId })
            .populate({
                path: "items.tshirtModelId",
                select: "name price image availableColors availableSizes"
            })
            .populate({
                path: "items.designId",
                select: "imageUrl position scale rotation"
            });

        // If no cart exists for the user yet, let's create a new empty cart
        if (!cart) {
            cart = await Cart.create({ userId, items: [] });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart", error: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { tshirtModelId, designId, size, color, quantity } = req.body;
        const userId = req.user.id;
        
        const qty = Number(quantity) || 1;

        // 1. Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // 2. Check if the exact configuration (T-shirt, Design, Size, Color) already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => {
            const hasSameTshirt = item.tshirtModelId.toString() === tshirtModelId;
            const hasSameSize = item.size === size;
            const hasSameColor = item.color === color;
            
            // Check design matches: both are undefined/null, or both match as strings
            const hasSameDesign = (!item.designId && !designId) || 
                (item.designId && designId && item.designId.toString() === designId);

            return hasSameTshirt && hasSameSize && hasSameColor && hasSameDesign;
        });

        if (existingItemIndex > -1) {
            // Item already in cart! Increase the quantity
            cart.items[existingItemIndex].quantity += qty;
        } else {
            // New item! Add to cart array
            cart.items.push({
                tshirtModelId,
                designId: designId || undefined,
                size,
                color,
                quantity: qty
            });
        }

        // 3. Save to database
        await cart.save();

        // 4. Fetch the fully populated cart to return to the client
        const populatedCart = await Cart.findById(cart._id)
            .populate({
                path: "items.tshirtModelId",
                select: "name price image availableColors availableSizes"
            })
            .populate({
                path: "items.designId",
                select: "imageUrl position scale rotation"
            });

        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to cart", error: error.message });
    }
};

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/items/:itemId
// @access  Private
export const updateCartItemQuantity = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;

        const qty = Number(quantity);
        if (isNaN(qty) || qty < 1) {
            return res.status(400).json({ message: "Quantity must be a positive integer greater than or equal to 1." });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the specific item in the items array by its subdocument _id
        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update quantity
        item.quantity = qty;
        await cart.save();

        // Get populated cart
        const populatedCart = await Cart.findById(cart._id)
            .populate({
                path: "items.tshirtModelId",
                select: "name price image"
            })
            .populate({
                path: "items.designId",
                select: "imageUrl"
            });

        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Failed to update item quantity", error: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove item from mongoose array subdocument list
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        await cart.save();

        // Get populated cart
        const populatedCart = await Cart.findById(cart._id)
            .populate({
                path: "items.tshirtModelId",
                select: "name price image"
            })
            .populate({
                path: "items.designId",
                select: "imageUrl"
            });

        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from cart", error: error.message });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(200).json({ message: "Cart cleared successfully", items: [] });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear cart", error: error.message });
    }
};
