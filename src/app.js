const express = require("express");

require("./configs/database");
require("./models/index");
require("./configs/cloudinary");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});