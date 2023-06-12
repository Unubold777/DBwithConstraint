const {
 getAnswers
} = require("../controller/poll_answers");

const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/poll/:id").get(protect, getAnswers);
module.exports = router;