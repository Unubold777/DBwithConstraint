const {
    createPoll,
    getPolls,
    getPoll,
  } = require("../controller/polls");
  const {getUsername} = require("../controller/users");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/create_poll").post(protect, createPoll);
  router.route("/").get(protect, getPolls);
  router.route("/poll/:id", get(protect, getPoll));
  router.route("/poll/:id", get(protect, getUsername));
  module.exports = router;