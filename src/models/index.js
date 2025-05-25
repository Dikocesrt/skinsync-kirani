const User = require("./user");
const Product = require("./product");
const SkinType = require("./skinType");
const History = require("./history");
const Article = require("./article");

User.hasMany(History, { foreignKey: "user_id" });
History.belongsTo(User, { foreignKey: "user_id" });

SkinType.hasMany(History, { foreignKey: "skin_type_id" });
History.belongsTo(SkinType, { foreignKey: "skin_type_id" });

SkinType.hasMany(Product, { foreignKey: "skin_type_id" });
Product.belongsTo(SkinType, { foreignKey: "skin_type_id" });

SkinType.hasMany(Article, { foreignKey: "skin_type_id" });
Article.belongsTo(SkinType, { foreignKey: "skin_type_id" });

const initializeTables = async () => {
    await User.sync({ alter: true });
    await SkinType.sync({ alter: true });
    await Product.sync({ alter: true });
    await History.sync({ alter: true });
    await Article.sync({ alter: true });
};

initializeTables();

module.exports = {
    User,
    Product,
    SkinType,
    History,
    Article
};