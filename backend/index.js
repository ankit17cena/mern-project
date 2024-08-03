const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/file");
const connectDB = require("./config/db");
const authenticateToken = require("./middlewares/authMiddleware");
 
dotenv.config();
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
connectDB();
 
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
 
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
