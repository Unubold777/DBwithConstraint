const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const poll = require("../sequelize/models/users");
var Sequelize = require("../sequelize");
const e = require("express");
const logger = require("../services/logger").logger;

exports.createPoll = asyncHandler(async (req,res,next) => {
    const {userid} = req.params
    const { question,startdate,expiredate, answer} = req.body
    if(!question || !startdate || !expiredate) {
        return res.status(400).json({
            success:false,
            message:"table is empty!!!",
        });
        }
    await poll.findOne({
        where: {
            [Op.and]: [{userid:userid},{question:question}]
        }
    })
        .then(async(result) =>{
            if(result == null){
                const new_poll = await poll.create({
                    userid: user.id,
                    question: question,
                    startdate: startdate,
                    expiredate: expiredate,
                  }).then(async (result) => {
                    let new_poll_id = new_poll.id
                    for(i in answer){
                        await poll.answers.create({
                            pollid: new_poll_id,
                            answername: answer[i]
                        });
                    }
                    return res.status(200).json({
                      success: true,
                      message: "poll added successfully",
                    });
                  });
            }else{
                res.status(500).json({
                    success: false, 
                    message: "service fault",
                });
            }
        });
    });
    
    

    //code below doing different thing other than creating
    let poll_list = [];

    conn_result.forEach((poll) => {
    if (poll.id) {
      poll_list.push({
        name: poll.userid,
        question: poll.question,
        startdate: poll.startdate,
        expiredate: poll.expiredate
      });
    }
  });

