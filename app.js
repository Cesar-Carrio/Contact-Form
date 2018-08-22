const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const expressSession = require("express-session");

const app = express();

// connecting to databse / creating database if it does not exist
mongoose.connect(
  "mongodb://localhost:27017/contact_db",
  { useNewUrlParser: true }
);

app.set("view engine", "pug"); //template engine - pug/jade
app.use(express.static("public")); //serve custom style sheet
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(
  expressSession({ secret: "max", saveUninitialized: false, resave: false }) // for sessions
);

const contactRoutes = require("./routes");
const managerRoutes = require("./routes/manager");

app.use(contactRoutes);
app.use(managerRoutes);

// IF page doesn't exist
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
});

app.listen(3000, () => {
  console.log("server listening on port 3000....");
});
