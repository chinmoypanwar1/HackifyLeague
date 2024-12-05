import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({limit : "500mb"}))
app.use(express.urlencoded({extended : true, limit : "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes import 
import userRouter from "./routes/user.routes.js"
import teamRouter from "./routes/team.routes.js"
import hackathonRouter from "./routes/hackathon.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/hackathons", hackathonRouter);

// Global middleware to handle errors
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: "Internal Server Error"
    });
});

export default app;

export { app };