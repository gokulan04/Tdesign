import mongoose from "mongoose";

const designSnapshotSchema = new mongoose.Schema({
    imageUrl: String,
    side: {
        type: String,
        enum: ["front", "back"],
        required: true
    },
    position: {
        x: Number,
        y: Number
    },
    scale: Number,
    rotation: Number,
});

export default designSnapshotSchema;