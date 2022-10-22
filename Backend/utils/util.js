import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { user } from "../model/userModel.js";
import nodemailer from "nodemailer";
let transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASS },
});
function createNewUser(userObj) {
  user.exists({ email: userObj.email }, (err, res) => {
    if (err) {
      console.log(err);
      return -1;
    }
  });
  let u = new user(userObj);
  u.save()
    .then()
    .catch((err) => {
      console.log(err);
      return -2;
    });
}
function ValidateMail(token) {
  let success = false;
  let tokenobj = jwt.verify(token, process.env.LINKHASH);
  if (tokenobj == undefined || tokenobj == null) {
    console.log("invalid token");
    return -1;
  }
  user.exists({ email: token.email }, (err, res) => {
    if (err) {
      console.log(err);
      return -2;
    }
  });
  user
    .findOneAndUpdate({ email: tokenobj.email }, { EmailActive: true })
    .then(() => {
      console.log("email activated");
      success = true;
    })
    .catch((err) => console.log);
  return success;
}
function GenerateMailAuthLink(mail) {
  const payload = { email: mail, garbage: nanoid() };
  return jwt.sign(payload, process.env.LINKHASH, {
    algorithm: "HS256",
    expiresIn: 1200,
  });
}
function mailAuth(mail) {
  let token = GenerateMailAuthLink(mail);
  //need to add link generation and shits
  let isSent = sendMail(
    transport,
    mail,
    `http://192.168.43.169:3000/validate/${token}`
  );
  if (isSent == -1) return -1;
}
function sendMail(Mailaddr, link) {
  let Mail = {
    from: process.env.EMAIL,
    to: Mailaddr,
    subject: "Mail For Email Auth",
    text: `Your Email is being used to Signin into //testapp// if you didn't tried to Signin, Ignore.\n ${link}`,
  };
  transport.sendMail(Mail, (err, info) => {
    if (err) {
      console.log(err);
      return -1;
    } else {
      console.log(info.response);
      return 1;
    }
  });
}
export {
  createNewUser,
  mailAuth,
  sendMail,
  ValidateMail,
  GenerateMailAuthLink,
};
