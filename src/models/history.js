const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const History = sequelize.define(
  "history",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    age: { type: DataTypes.INTEGER },
    gender: {
      type: DataTypes.ENUM("pria", "wanita"),
    },
    activity: {
      type: DataTypes.ENUM("dalam ruangan", "luar ruangan", "hybrid"),
    },
    content: { type: DataTypes.TEXT },
    result: { type: DataTypes.TEXT },
    skin_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "skin_types",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "histories",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = History;
