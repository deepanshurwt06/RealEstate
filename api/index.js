import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"; // Ensure file extension is included
import authRoute from "./routes/auth.route.js"; // Ensure file extension is included
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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {  
  res.send("Hello World");
});

// Use the imported user routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})