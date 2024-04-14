const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

connectDB();

// Rest Object
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_MODE} mode`.yellow
      .bold
  );
});
