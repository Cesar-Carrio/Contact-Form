const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/contact_db",
  { useNewUrlParser: true }
);

const Message = app.set("view engine", "pug");
app.use(express.static("public")); //serve custom style sheet
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(
  expressSession({ secret: "max", saveUninitialized: false, resave: false })
);
const contactRoutes = require("./routes");
const managerRoutes = require("./routes/manager");

app.use(contactRoutes);
app.use(managerRoutes);

app.listen(3000, () => {
  console.log("server listening on port 3000....");
});
