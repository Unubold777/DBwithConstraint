const {
    createComment,
    getComments,
    editComments,
  } = require("../controller/comments");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/comments").post(protect, createComment);
  router.route("/comments").get(protect, getComments);
  router.route("/comments").put(protect, editComments);

  module.exports = router;