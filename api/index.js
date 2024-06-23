import authRouter from "./router/auth.route.js"
import courseRouter from "./router/course.route.js"
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

mongoose.connect(process.env.mongoAPI)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))
app.use("/api/auth",authRouter);
app.use("/api",courseRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
