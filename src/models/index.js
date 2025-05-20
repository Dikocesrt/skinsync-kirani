const User = require("./user");
const Product = require("./product");

const initializeTables = async () => {
    await User.sync({ alter: true });
    await Product.sync({ alter: true });
};

initializeTables();

module.exports = {
    User,
};