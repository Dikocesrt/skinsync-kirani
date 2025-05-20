const User = require("./user");

const initializeTables = async () => {
    await User.sync();
};

initializeTables();

module.exports = {
    User,
};