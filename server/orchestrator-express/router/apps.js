const AppsController = require("../controllers/appsController");
const router = require("express").Router();

router.get("/products", AppsController.findProduct);
router.get("/products/:id", AppsController.getProductById);
router.post("/products", AppsController.addProduct);
router.delete("/products/:id", AppsController.deleteProduct);
router.put("/products/:id", AppsController.editProduct);

module.exports = router;
