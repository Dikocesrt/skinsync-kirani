const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const SkinType = sequelize.define(
  "skin_type",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  },
  {
    tableName: "skin_types",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = SkinType;
