import Tshirt from "../models/Tshirt.js";

export const createTshirtModel = async (req, res) => {
    try {
        const { name, description, category, availableColors, availableSizes, price, image, active } = req.body;
        const shirt = await Tshirt.create({
            name,
            description,
            category,
            availableColors,
            availableSizes,
            price,
            image,
            active,
        });

        res.status(201).json(shirt);
    } catch (error) {
        res.status(500).json({ message: "Failed to create" });
    }
}

export const getAllTshirtModels = async (req, res) => {
    try {
        const shirts = await Tshirt.find();
        res.status(200).json(shirts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all t-shirts" });
    }
}

export const getTshirtModelById = async (req, res) => {
    try {
        const shirt = await Tshirt.findById(req.params.id);
        if (!shirt) {
            return res.status(404).json({ message: "T-shirt not found" });
        }
        res.status(200).json(shirt);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch t-shirt" });
    }
}

export const updateTshirtModel = async (req, res) => {
    try {
        const shirt = await Tshirt.findById(req.params.id);
        if (!shirt) {
            return res.status(404).json({ message: "T-shirt not found" });
        }
        const { name, description, category, availableColors, availableSizes, price, image, active } = req.body;

        const updatedShirt = await Tshirt.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                category,
                availableColors,
                availableSizes,
                price,
                image,
                active,
            },
            { new: true } /* with new : true we make sure to send newly updated data to client */
        );
        res.status(200).json(updatedShirt);
    } catch (error) {
        res.status(500).json({ message: "Failed to update t-shirt" });

    }
}


export const deleteTshirtModel = async (req, res) => {
    try {
        const shirt = await Tshirt.findById(req.params.id);
        if (!shirt) {
            return res.status(404).json({ message: "T-shirt not found" });
        }

        await Tshirt.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "T-shirt deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete t-shirt" });
    }
}