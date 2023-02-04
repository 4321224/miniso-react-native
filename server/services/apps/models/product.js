"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Images, { foreignKey: "productId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Slug is required",
          },
          notNull: {
            msg: "Slug is required",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
          min: {
            args: 10000,
          },
        },
      },
      mainImg: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "mainImg is required",
          },
          notNull: {
            msg: "mainImg is required",
          },
        },
      },
      categoryId: DataTypes.INTEGER,
      userMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate(product) {
          product.slug = product.name.replaceAll(" ", "-");
          // product.description = product.description.slice(0, 254);
        },
      },
      modelName: "Product",
    }
  );
  return Product;
};
