const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const comment = require("../sequelize/models/comments");
var Sequelize = require("../sequelize");
const e = require("express");
const comments = require("../sequelize/models/comments");
const logger = require("../services/logger").logger;

exports.createComment = asyncHandler(async(req,res,netx) =>{
    try {
        const {pollid} = req.params;
        const {comment} = req.body;
        const poll = await poll.findById(pollid);
        if (!poll) {
          throw new Error("throwing error!!! cuz we dont know");
        }
        await Comment.create({
          pollid: pollid,
          userid: req.usersid,
          comment: comment,
          posteddate: Date.now()
        });
        res.status(200).json(poll);
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
});
// exports.getComments = asyncHandler(async(req, res, next) => {
//   try {
//     const { pollid } = req.params;
//     const comments = await comments.find({
//       where: {
//         [Op.and]: [{pollid:pollid}],
//         order : [["posteddate","DESC"]],
//     }
//     }).
//     res.status(200).json(comments);
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// });
//writing another getComments
  exports.getComments = asyncHandler(async(req, res, next)=>{
    const {pollid} = req.params.pollid;
    await comments.findAll({
      where : {
        pollid : pollid,
        order: [["posteddate","DESC"]],
        raw: true
      }
    })
    res.status(200).json(comments);
  });

exports.editComments = asyncHandler(async(req,res,next)=>{
  try {
    const { commentsid } = req.params;
    const user = req.user;
    const comment = await comments.findById();
    if ( commentsid+ "" !== usersid + "") {
      throw new Error("You cannot edit that comment, because you not owner");
    }
    comment.posteddate = posteddate();
    comment.save();
    res.status(200).json("Comment edited");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});