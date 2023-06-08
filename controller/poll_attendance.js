const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const poll_attendance = require("../sequelize/models/poll_attendance");
const polls = require("../sequelize/models/polls");
const users = require("../sequelize/models/users");
const poll_answers = require("../sequelize/models/poll_answers");


var Sequelize = require("../sequelize");
const e = require("express");
const logger = require("../services/logger").logger;

exports.getPollAttendance = async (req, res, next) => {
    try {
      const {pollid} = req.params;
      const answers = await poll_answers.findById(pollid);
      const answerNums = [];
      for (num of answers.comments) {
        let temp = 0;
        
        comments.push(await Comment.findById(com));
      }
      res.status(200).json(comments);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };