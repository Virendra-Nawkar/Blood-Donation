import express from "express";
import cookie_parser from "cookie-parser";
import dotenv from "dotenv";
import { router } from "./routes/route.js";
import mongoose from "mongoose";
import { user } from "./model/userModel.js";
import { GenerateMailAuthLink, mailAuth, sendMail } from "./utils/util.js";
dotenv.config();

let app = express();

mongoose
  .connect("mongodb://localhost:27017/bloodshit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
