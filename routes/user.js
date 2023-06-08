//const { uploadImageProfile, createUser } = require("../controller/user");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/register").post(createUser);
module.exports = router;