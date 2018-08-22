const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  message: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
