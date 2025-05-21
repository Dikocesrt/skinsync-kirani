// PORT DEPEDENCY
const express = require("express");
const path = require("path");
const hbs = require("hbs"); 
const router = require("./routes/route");
const session = require("express-session");
require("dotenv").config();
require("./configs/database");
require("./models/index");
require("./configs/cloudinary");

// MEMBUAT WEB SERVER
const app = express();

// SETUP TEMPLATE ENGINE
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// SETUP STATIC FILE
app.use(express.static(path.join(__dirname, "../public")));

// SETUP BODY PARSER
app.use(express.urlencoded({ extended: true }));

// SETUP SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
}));

// ROUTE
app.use(router);

const port = process.env.PORT || 3000;

// RUN APLIKASI
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});