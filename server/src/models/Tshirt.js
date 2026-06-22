import mongoose from "mongoose";

const tshirtSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    availableColors: [String],
    availableSizes: [String],
    price: Number,
    image: String,
    active: Boolean
}, { timestamps: true });

export default mongoose.model("Tshirt", tshirtSchema); 