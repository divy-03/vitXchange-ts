import express, { Request, Response } from "express";
import errorMiddleware from "./middleware/errors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://vitxchange.vercel.app",
  "http://localhost:5173",
];

// Dynamic CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

// Apply CORS middleware with options
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

// Middleware for parsing cookies
app.use(cookieParser());

// Routes
const user = require("./routes/userRoute");
app.use("/api/v1", user);

const product = require("./routes/productRoute");
app.use("/api/v1", product);

const cart = require("./routes/cartRoute");
app.use("/api/v1", cart);

const order = require("./routes/orderRoute");
app.use("/api/v1", order);

// Error middleware
app.use(errorMiddleware);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json("Server Working");
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
