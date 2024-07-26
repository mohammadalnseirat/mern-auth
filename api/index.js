import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouting from "./routes/user.route.js";
import authRouting from "./routes/auth.route.js";
const port = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // server is running on port 3000
});

// test api routes:
app.use("/api/user", userRouting);
app.use("/api/auth", authRouting);

// create a middleware:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
