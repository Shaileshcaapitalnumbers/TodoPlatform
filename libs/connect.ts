import mongoose from "mongoose";
import { string } from "zod";

const MongoDBUriSchema = string();
const DBURI:any =process.env.MONGODB_URI
export const connectMongoDB = async () => {
    try {
        MongoDBUriSchema.parse(DBURI);
        await mongoose.connect(DBURI);
    } catch (err) {
        throw new Error("Error while connecting to MongoDB");
    }
};