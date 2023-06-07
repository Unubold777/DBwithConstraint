const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const comment = require("../sequelize/models/comments");
var Sequelize = require("../sequelize");
const e = require("express");
const logger = require("../services/logger").logger;

exports.createComment = asyncHandler(async(req,res,netx) =>{
    try {
        const { pollid,userid } = req.params;
        const {comment} = req.body;
        const poll = await poll.findById(pollid);
        if (!poll) {
          throw new Error("throwing error!!! cuz we dont know");
        }
        await Comment.create({
          pollid: req.pollid,
          userid: req.usersid,
          comment: comment,
          posteddate: Date.now()
        });
        res.status(200).json(poll);
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
});
