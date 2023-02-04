const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/user", UserController.find);
router.get("/user/:id", UserController.findOne);
router.post("/user", UserController.postUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
