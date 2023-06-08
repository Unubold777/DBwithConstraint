const {
    createPoll,
    getPolls,
  } = require("../controller/polls");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/createpolls/").post(protect, createPoll);
  router.route("/").get(protect, getPolls);
  router.route("/polls/:id",post(protect,))
  module.exports = router;