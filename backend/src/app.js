import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes import 
import userRouter from "./routes/user.routes.js"
import teamRouter from "./routes/team.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamRouter);

// Global middleware to handle errors
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        // Only return statusCode and message
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Fallback for unknown errors
    return res.status(500).json({
        message: "Internal Server Error"
    });
});

export default app;

export { app };