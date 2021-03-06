import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//adding http://localhost:5000/
app.get("/", (req, res) => {
  res.send("Davit Hunanyan's API of MERN Fullstack Project - Memories");
});

//adding http://localhost:5000/posts
app.use("/posts", postRoutes);

//adding http://localhost:5000/user
app.use("/user", userRoutes);

//https://www.mongodb.com/cloud/atlas
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
