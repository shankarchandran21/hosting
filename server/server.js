import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import admin from "firebase-admin";
import credential from "./credential/credential.json" assert { type: "json" };
import userRoute from "./routes/user.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

admin.initializeApp({
    credential: admin.credential.cert(credential)
  });
// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use("/api/user",userRoute)



// Server
app.listen(PORT, connectDB);
