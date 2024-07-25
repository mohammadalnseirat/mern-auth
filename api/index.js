import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouting from "./routes/user.route.js";
const port = process.env.PORT || 3000;
dotenv.config();

const app = express();

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
