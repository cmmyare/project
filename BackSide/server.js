import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import testRout from "./routs/testRout.js";
import authRouter from "./routs/authRouter.js";
import userRouter from "./routs/userRouter.js";
import { authenticateUser } from "./middileware/authMiddleware.js";
// Load environment variables
dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

// cores
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Allows cookies to be sent
  })
);

// ✅ Set cookies correctly
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });
// Debugging: Ensure environment variables are loaded
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URL:", process.env.MONGO_URL ? "Loaded" : "Not Loaded");

// Define routes
app.use("/api/test", authenticateUser, testRout);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

// Enable request logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to MongoDB and start the server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully");

    // Start server **only after** successful DB connection
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}...`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

// Call function to start everything
connectDB();
