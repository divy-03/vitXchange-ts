import express from "express";
import errorMiddleware from "./middleware/errors";
const cors = require("cors");
const app = express();

// app.use(cors({ origin: "http://localhost:5137", credentials: true }));
app.use(cors());
app.use(express.json());

const user = require("./routes/userRoute");
app.use("/api/v1", user);

app.use(errorMiddleware);

export default app;
