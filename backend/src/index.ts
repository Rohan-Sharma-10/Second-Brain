import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/userRoutes";
import contentRoutes from "./routes/contentRoutes";

dotenv.config();
const app = express();
app.use(cors({
    origin: "https://second-brain-omega-two.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true 
  }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

const DB_URL = process.env.DB_URL as string;
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Mongoose connected");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
}).catch(err => console.error("Database connection error: ", err));
