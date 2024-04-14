const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

// Rest Object
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_MODE} mode`.yellow.bold
  );
});
