const { Login } = require("../controller/login");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/login").post(Login);

module.exports = router;