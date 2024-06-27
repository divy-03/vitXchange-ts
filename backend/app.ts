import express, { NextFunction, Request, Response } from "express";
import errorMiddleware from "./middleware/errors";
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Correct origin
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cookieParser());

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Custom middleware to ensure CORS headers are set
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

const user = require("./routes/userRoute");
app.use("/api/v1", user);

const product = require("./routes/productRoute");
app.use("/api/v1", product);

app.use(errorMiddleware);

export default app;
