import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"; // Ensure file extension is included

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {  
  res.send("Hello World");
});

// Use the imported user routes
app.use("/api/user", userRoutes);
