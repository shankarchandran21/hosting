import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.router.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;


// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({ credentials: true, origin: "https://cheery-marigold-7c7521.netlify.app"}));
app.use(cookieParser());


app.use("/api/user",userRoute)
app.use("/api/task",taskRoute)



// Server
app.listen(PORT, connectDB);
