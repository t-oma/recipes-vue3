import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import { connectDatabase } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorHandler);

const startServer = async () => {
    try {
        if (
            !process.env["JWT_SECRET"] ||
            process.env["JWT_SECRET"].trim() === ""
        ) {
            throw new Error("JWT_SECRET not set!");
        }

        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(
                `Environment: ${process.env["NODE_ENV"]}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
