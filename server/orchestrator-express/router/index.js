const router = require("express").Router();
const app = require("./apps");
const user = require("./users");

router.use("/app", app);
router.use("/user", user);

module.exports = router;
