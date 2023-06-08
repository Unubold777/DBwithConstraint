const {
    createPoll,
    getPolls,
  } = require("../controller/polls");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/polls").post(protect, createPoll);
  router.route("/polls").get(protect, getPolls);

  module.exports = router;