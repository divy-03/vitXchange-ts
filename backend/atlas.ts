import mongoose from "mongoose";

const uri = "mongodb+srv://divy03:Divy%40Mongo03@cluster0.wai0a.mongodb.net/vitxchangedb?retryWrites=true&w=majority&appName=Cluster0";

export async function connectToAtlas() {
  try {
    await mongoose.connect(uri);

    mongoose.connection.once("open", () => {
      console.log("Successfully connected to MongoDB Atlas!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1); // Exit the process with failure code if connection fails
  }
}

export default mongoose;
