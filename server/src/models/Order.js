import mongoose from "mongoose";
import designSnapshotSchema from "./DesignSnapshot";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            tshirtModelId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tshirt",
                required: true
            },
            color: String,
            size: String,
            quantity: Number,
            designSnapshot: {
                type: designSnapshotSchema,
                required: true
            },
            unitPrice: Number,
            totalPrice: Number
        }
    ],
    totalAmount: Number,
    orderStatus: {
        type: String,
        enum: [
            "created",
            "approved",
            "printing",
            "shipped",
            "delivered",
            "cancelled"
        ],
        default: "created"
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema); 