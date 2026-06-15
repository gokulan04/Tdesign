import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { protect } from "./middleware/authMiddleware.js";
import { authorize } from "./middleware/roleMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/admin/test", protect, authorize("admin"), (req, res) => {
    console.log("test---");
    res.json({ message: "Admin access granted" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
