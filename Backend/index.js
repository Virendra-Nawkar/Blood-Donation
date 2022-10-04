import express from "express";
import cookie_parser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
