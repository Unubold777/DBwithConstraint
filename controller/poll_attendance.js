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

exports.getPollAttendance = asyncHandler(async(req.res.next)=>
try{
    const {pollid} = req.pollid;
    const  = await polls.find({
        where : {
            [Op.and]:[{ pollid:pollid}],
            
        }
    }).then(async(result)=>{
        let attendace = [];
        result.forEach((result)=>
        
        )
    })
}catch(e){
    res.status(400).json({error:e.message});
});