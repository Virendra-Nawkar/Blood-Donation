import express from "express";
import { ValidateMail, createNewUser } from "../utils/util.js";
const router = express.Router();
router.get("/", (req, res) => {
  console.log("hello,world");
  res.sendStatus(200);
});
router.post("/signup", (req, res) => {
  const user = createNewUser({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password,
  });
  if (user != 1) {
    if (user == -1) {
      res.end("user already exists!");
    } else if (user == -2) {
      res.end("couldn't create user for some reason...");
    }
  }
  mailAuth(req.params.email);
  res.sendStatus(200);
});
router.get("/validate/:token", (req, res) => {
  ValidateMail(req.params.token);
  res.sendStatus(200);
});

export { router };
