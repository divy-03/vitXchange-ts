import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/vitXchange")
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log("Error conecting to DB:", error);
    });
};

export default connectDatabase;
