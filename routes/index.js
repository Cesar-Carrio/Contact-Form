const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const nodemailer = require("nodemailer");
const messageModel = require("../models/messages");

// Email Account Credentials for throw away account
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "no.reply.hovercam@gmail.com",
    pass: "Mancilla278!"
  }
});

// INDEX Route
router.get("/", (req, res) => {
  res.render("index", {
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
  req.session.success = null;
});

// Message Submission Route
router.post(
  "/submit",
  [
    body("name", "Invalid Name is too short").isLength({ min: 4 }),
    body("email", "Invalid Email")
      .isEmail()
      .normalizeEmail(),
    body("title", "Please enter a title").isLength({ min: 1 }),
    body("message", "Please enter a message").isLength({ min: 1 }),
    sanitizeBody("name")
      .trim()
      .escape(),
    sanitizeBody("title")
      .trim()
      .escape(),
    sanitizeBody("message")
      .trim()
      .escape()
  ],
  (req, res) => {
    // checking to see if any errors occured from
    // validation or sanitizing
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.success = false;
      req.session.errors = errors.array();
    } else {
      req.session.success = true;
      req.session.errors = null;

      //creating the message
      messageModel.create({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        message: req.body.message
      });

      // Email options
      var mailOptions = {
        from: "no.reply.hovercam@gmail.com",
        to: `${req.body.email}`,
        subject: "Message Recieved Confirmation!",
        html: "<h1>Message Recieved, we will contact you soon.</h1>"
      };

      // sending email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.render("success");
    }

    res.redirect("/");
  }
);

module.exports = router;
