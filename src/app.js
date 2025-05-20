// PORT DEPEDENCY
const express = require("express");
const path = require("path");
const hbs = require("hbs"); 
require("dotenv").config();
require("./configs/database");
require("./models/index");
require("./configs/cloudinary");

// MEMBUAT WEB SERVER
const app = express();

const port = process.env.PORT || 3000;

// RUN APLIKASI
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});