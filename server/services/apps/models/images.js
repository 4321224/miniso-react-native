"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Images.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Images.init(
    {
      productId: DataTypes.INTEGER,
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Image is required",
          },
          notNull: {
            msg: "Image is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};
