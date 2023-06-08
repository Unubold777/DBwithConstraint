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
exports.getComments = asyncHandler(async(req, res, next) => {
  try {
    const { pollid } = req.params;
    const comments = await comments.find({
      where: {
        [Op.and]: [{pollid:pollid}],
        order : [["posteddate","DESC"]],
    }
    }).then(async(result)=> {
      let comment_list =[];
      result.forEach((result)=>
      comment_list.push({
        id:result.id,
        pollid:result.pollid,
        userid:result.userid,
        comment:result.comment,
        posteddate:result.posteddate,
      },));

    }
  );
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

exports.editComments = asyncHandler(async(req,res,next)=>{
  try {
    const { commentsid } = req.params;
    const user = req.user;
    const comment = await Comment.findById();
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