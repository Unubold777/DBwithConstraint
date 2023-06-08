const {
    createComment,
    getComments,
    editComments,
  } = require("../controller/comments");
  const { protect } = require("../middleware/protect");
  
  const router = require("express").Router();
  
  router.route("/polls/:id").post(protect, createComment);
  router.route("/polls/:id").get(protect, getComments);
  router.route("/comments").put(protect, editComments);

  module.exports = router;