const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Article = sequelize.define(
  "article",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    link_url: { type: DataTypes.STRING },
    skin_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "skin_types",
        key: "id",
      },
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Article;
