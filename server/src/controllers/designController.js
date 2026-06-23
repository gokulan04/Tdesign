import Design from "../models/Design.js";

export const createDesign = async (req, res) => {
    try {
        const { userId, tshirtModelId, imageUrl, position, scale, rotation } = req.body;
        const design = await Design.create({ userId, tshirtModelId, imageUrl, position, scale, rotation });
        res.status(201).json(design);
    } catch (error) {
        res.status(500).json({ message: "Failed to create design" });
    }
}

export const getAllDesigns = async (req, res) => {
    try {
        const designs = await Design.find();
        res.status(200).json(designs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch designs" });
    }
}

export const getDesignById = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }
        res.status(200).json(design);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch design by id" });
    }
}

export const updateDesign = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }
        const { userId, tshirtModelId, imageUrl, position, scale, rotation } = req.body;
        const updatedDesign = await Design.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                tshirtModelId,
                imageUrl,
                position,
                scale,
                rotation,
            },
            { new: true }
        );
        res.status(200).json(updatedDesign);
    } catch (error) {
        res.status(500).json({ message: "Failed to update design" });
    }
}

export const deleteDesign = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }
        await Design.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Design deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete design" });
    }
}