const asyncHandler = require("../middleware/asyncHandler");
//const db = require("../services/database");
const { Op, QueryTypes } = require("sequelize");
const comment = require("../sequelize/models/users");
const comment = require("../sequelize/models/polls");
const comment = require("../sequelize/models/users");
var Sequelize = require("../sequelize");
const e = require("express");
const logger = require("../services/logger").logger;

exports.createComment = asyncHandler(async(res,req,next)=>{
    
});
