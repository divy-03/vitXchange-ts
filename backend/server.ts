import app from "./app";
import connectDatabase from "./database";
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

connectDatabase();


// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
