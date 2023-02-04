const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const errorHandler = require("../middleware/errorHandler");

router.get("/products", productController.readAllProduct);
router.post("/products", productController.addProduct);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);

router.get("/categories", categoryController.readAllCategories);
router.post("/categories", categoryController.addCategory);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", categoryController.editCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

router.use(errorHandler);

module.exports = router;
