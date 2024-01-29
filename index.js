const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const biodatainvalidroutes = require("./routes/biodatainvalidRoutes");

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/biodatainvalid", biodatainvalidroutes);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
