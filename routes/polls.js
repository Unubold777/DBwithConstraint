const {
    createPoll,
    getPolls,
    getPoll,
  } = require("../controller/polls");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/create_poll").post(protect, createPoll);
  router.route("/").get(protect, getPolls);
  router.route("/poll/:id", post(protect, getPoll));
  module.exports = router;