import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";

dotenv.config();
connectDB();

const app = express();

// Leer datos de formularios(Body Request)
app.use(express.json());
app.use(cors(corsConfig));

// Routes
app.use("/api/projects", projectRoutes);

export default app;
