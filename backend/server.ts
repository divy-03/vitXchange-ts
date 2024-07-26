import app from "./app";
import connectDatabase from "./database";
import { v2 as cloudinary } from "cloudinary";
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
