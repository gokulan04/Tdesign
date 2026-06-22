import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
    userId: String,
    tshirtModelId: String,
    imageUrl: String,
    position: {
        x: Number,
        y: Number
    },
    scale: Number,
    rotation: Number,
}, { timestamps: true });

export default mongoose.model("Design", designSchema); 