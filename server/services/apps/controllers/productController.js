const { Product, Images, Category, sequelize } = require("../models");

// console.log(Product);

class productController {
  static async readAllProduct(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [{ model: Images }, { model: Category }],
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error });
      // next(error);
    }
  }
  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        image1,
        image2,
        categoryId,
      } = req.body;
      console.log(req.body, "ini req body");
      if (!image1) {
        throw {
          code: 400,
          msg: "Image1 is required",
        };
      }
      if (!image2) {
        throw {
          code: 400,
          msg: "Images2 is required",
        };
      }
      if (!categoryId) {
        throw {
          code: 400,
          msg: "Category is required",
        };
      }
      const findCategory = await Category.findByPk(categoryId);
      if (!findCategory) throw { code: 404, msg: "Category not found" };
      //   console.log(findCategory.id, categoryId, "<<<<");
      const product = await Product.create(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId: findCategory.id,
        },
        { transaction: t }
      );

      // await Images.bulkCreate(
      //   [
      //     {
      //       productId: product.id,
      //       imgUrl: image1,
      //     },
      //     {
      //       productId: product.id,
      //       imgUrl: image2,
      //     },
      //   ],
      //   { transaction: t }
      // );
      await t.commit();
      res.status(201).json(product);
    } catch (error) {
      // console.log(error);
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id,
        },
        include: [{ model: Images }, { model: Category }],
      });
      if (!product) {
        throw {
          code: 404,
          msg: "Product not found",
        };
      }
      console.log(product, "ini dari detail id");
      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, image1, image2, categoryId } =
        req.body;
      const { id } = req.params;

      const findCategory = await Category.findByPk(categoryId);
      if (!findCategory) throw { code: 404, msg: "Category not found" };

      const findProduct = await Product.findOne({
        include: { model: Images },
        where: { id },
      });
      console.log(findProduct);
      if (!findProduct) throw { code: 404, msg: "Product not found" };

      const product = await Product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
        },
        { where: { id }, transaction: t }
      );
      await Images.bulkCreate(
        [
          {
            productId: product.id,
            imgUrl: image1,
          },
          {
            productId: product.id,
            imgUrl: image2,
          },
        ],
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({
        message: `Product with id ${id} was update`,
        data: product,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        throw {
          code: 404,
          msg: "Product not found",
        };
      }
      await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Product with Id ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productController;
