import app from "./app";
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
