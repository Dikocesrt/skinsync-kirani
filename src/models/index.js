const User = require("./user");
const Product = require("./product");
const SkinType = require("./skinType");
const History = require("./history");
const Article = require("./article");


const initializeTables = async () => {
    await User.sync({ alter: true });
    await Product.sync({ alter: true });
    await SkinType.sync({ alter: true });
    await History.sync({ alter: true });
    await Article.sync({ alter: true });
};

initializeTables();

module.exports = {
    User,
};