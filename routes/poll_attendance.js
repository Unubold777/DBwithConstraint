const {
    getPollAttendance,
  } = require("../controller/poll_attendance");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/poll_attendance").get(protect, getPollAttendance);

  module.exports = router;