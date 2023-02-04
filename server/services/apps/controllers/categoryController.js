const { Category } = require("../models");

class categoryController {
  static async readAllCategories(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: {
          id,
        },
      });
      if (!category) {
        throw {
          code: 404,
          msg: "Category not found",
        };
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const categoriId = await Category.findByPk(id);
      if (!categoriId) {
        throw {
          code: 404,
          msg: "Category not found",
        };
      }
      const category = await Category.update(
        {
          name,
        },
        {
          where: { id },
        }
      );
      res.status(201).json({ msg: `category with id ${id} edit success` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        throw {
          code: 404,
          msg: "Category not found",
        };
      }
      await Category.destroy({
        where: { id },
      });
      res.status(200).json({
        statusCode: 200,
        message: `Category with id ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = categoryController;
