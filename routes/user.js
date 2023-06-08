//const { uploadImageProfile, createUser } = require("../controller/user");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/create").post(createUser);
module.exports = router;