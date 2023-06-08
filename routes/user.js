//const { uploadImageProfile, createUser } = require("../controller/user");
const { createUsers } = require("../controller/users");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/register").post(protect,createUsers);
router.route("/registerUser").post(protect,registerUser);
module.exports = router;