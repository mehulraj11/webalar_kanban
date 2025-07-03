const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const authRoutes = require("./routes/authRoute.js")
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
