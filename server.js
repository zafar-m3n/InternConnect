const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const passportSetup = require("./config/passportSetup");

// Load env vars
dotenv.config();

connectDB();

// Rest Object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_MODE} mode`.yellow
      .bold
  );
});
