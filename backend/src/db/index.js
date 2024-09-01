import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async function() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}/${DB_NAME}`);
        console.log(`DB Connection Established!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB Connection Failed", error);
        process.exit(1);
    }
}

export {connectDB};