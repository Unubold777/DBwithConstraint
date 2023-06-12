const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const poll = require("../sequelize/models/polls");
var Sequelize = require("../sequelize");
const e = require("express");
const poll_answers = require("../sequelize/models/poll_answers");
//const logger = require("../services/logger").logger;

exports.getPollAnswers = asyncHandler(async (req,res,next)=>{
  const pollid = req.params.id;
  const answers = await poll_answers.findAll({
    where:{
      pollid:pollid,
    },
    order: [["id","ASC"]],
  });
  if(answers) res.status(200).json({answers, message:"Answers"});
  else res.status(400).json({message: "Answers not exist"});
  
});