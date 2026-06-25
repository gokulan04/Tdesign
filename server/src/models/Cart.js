import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        tshirtModelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tshirt",
            required: true
        },
        designId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Design",
            required: false // Optional, in case the user wants to add a plain T-shirt to the cart
        },
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity cannot be less than 1."],
            default: 1
        }
    },
    { timestamps: true }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        items: [cartItemSchema]
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
