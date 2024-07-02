import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./src/routes/users.js";
import { postRouter } from "./src/routes/posts.js";

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/auth", userRouter);
// app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Site Online" });
});

mongoose.connect(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
