const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Product = sequelize.define(
  "product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    benefit: { type: DataTypes.TEXT },
    ingredient: { type: DataTypes.TEXT },
    instruction: { type: DataTypes.TEXT },
    link_url: { type: DataTypes.TEXT },
    category: {
      type: DataTypes.ENUM(
        "micellar water",
        "face wash",
        "toner",
        "serum",
        "moisturizer",
        "sunscreen"
      ),
      allowNull: false,
    },
    skin_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "skin_types",
        key: "id",
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Product;
