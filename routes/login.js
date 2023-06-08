const { Login } = require("../controller/login");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/login").post(protect, Login);

module.exports = router;