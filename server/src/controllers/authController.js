import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export const register = async (req, res) => {
    console.log("REQUEST", req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, password: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
        token,
        user: { id: user._id, email: user.email }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid passowrd" });
    }

    const token = generateToken(user._id);

    res.json({
        token,
        user: { id: user._id, email: user.email }
    });

}