const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const messageModel = require("../models/messages");

router.get("/manager", (req, res) => {
  messageModel.find({}, (err, messages) => {
    if (err) {
      console.log("Error!");
    } else {
      res.render("messages", { messages: messages });
    }
  });
});

router.get("/manager/namesearch", (req, res) => {
  messageModel.find({ name: req.query.name }, (err, messages) => {
    if (err) {
      res.redirect("/manager");
    } else {
      res.render("messages", { messages: messages });
    }
  });
});

router.get("/manager/emailsearch", (req, res) => {
  messageModel.find({ email: req.query.email }, (err, messages) => {
    if (err) {
      res.redirect("/manager");
    } else {
      res.render("messages", { messages: messages });
    }
  });
});

module.exports = router;
