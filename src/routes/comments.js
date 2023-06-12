const {
    createComment,
    getComments,
    editComments,
  } = require("../controller/comments");
  const { protect } = require("../middleware/protect");
  const {getUsername} = require("../controller/users")
  const router = require("express").Router();
  
  router.route("/polls/:id").post(protect, createComment);
  router.route("/polls/:id").get(protect, getComments);
  router.route("/comments").put(protect, editComments);
  router.route("/poll/:id", get(protect, getUsername));
  module.exports = router;