const UsersController = require("../controllers/usersController");
const router = require("express").Router();

router.get("/", UsersController.findUser);
router.get("/:id", UsersController.findUserById);
router.post("/", UsersController.addUser);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
