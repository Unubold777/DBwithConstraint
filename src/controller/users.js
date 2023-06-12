const jwt = require("jsonwebtoken");

const { Op, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler")

const Users = require("../sequelize/models/users");
const fs = require("fs");
const path = require("path"); 
//const users = require("../sequelize/models/users");
const { raw } = require("body-parser");
exports.createUsers = asyncHandler(async (req, res, next) => {
    //Бүртгүүлэх хэсэг
    const { username, email, password, birthdate} = req.body;
  
    if (!username || !email || !password || !birthdate) {
      return res.status(400).json({
        success: false,
        message: "Талбар дутуу байна",
      });
    }

    await Users.findAll({
      where: {
        [Op.and]: [
          {
            username: username,
          },
          {
            email: email,
          },
         
        ],
      },
    })
      .then(async (result) => {
        if (result == null) {
          const salt = await bcrypt.genSalt(10);
          let encryptedPassword = await bcrypt.hash(password, salt);
  
          await Users.create({
            username: username,
            email: email,
            password: encryptedPassword,
            birthdate: birthdate,
            role: 'User'
          }).then(async (result) => {
            return res.status(200).json({
              success: true,
              // token: encryptedPassword,
              message: "Амжилттай бүртгэлээ",
            });
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Бүртэлтэй байна",
          });
          return;
        }
      })
      .catch((err) => {
        logger.error("Алдаа гарлаа: " + err);
        return res.status(500).json({
          success: false,
          message: "Серверийн алдаа",
        });
      });
  });

  exports.getUsers = asyncHandler(async (req,res,next) => {
    //method for admin that gets every users
      const users  = await users.findAll({
        raw: true,   
        order: [["id","DESC"]],
        raw: true,
      }).catch((err) => {
        res.status(500).json({
          message: "Серверийн алдаа",
        });
      });
      res.status(200).json({users,
      message: "List of users"
      });
    });  
    exports.registerUser = asyncHandler(async (req,res,next)=>{
      const {username,email,password,birthdate,role} =req.body;
      
    if (!username || !email || !password || !birthdate) {
      return res.status(400).json({
        success: false,
        message: "Талбар дутуу байна",
      });
    }
    await Users.findAll({
      where: {
        [Op.and]: [
          {
            username: username,
          },
          {
            email: email,
          },
         
        ],
      },
    })
      .then(async (result) => {
        if (result == null) {
          const salt = await bcrypt.genSalt(10);
          let encryptedPassword = await bcrypt.hash(password, salt);
  
          await Users.create({
            username: username,
            email: email,
            password: encryptedPassword,
            birthdate: birthdate,
            role: 'User'
          }).then(async (result) => {
            return res.status(200).json({
              success: true,
              // token: encryptedPassword,
              message: "Амжилттай бүртгэлээ",
            });
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Бүртэлтэй байна",
          });
          return;
        }
      }).then(async (result) => {
        return res.status(200).json({
          success: true,
          // token: encryptedPassword,
          message: "Амжилттай бүртгэлээ",
        });
      });
  });

  //get username controller
  exports.getUsername = asyncHandler( async ( req,res,next)=>{
    const userid = req.params.id;
    const user = await users.findById({
      where: {
        id: userid,
      }
    });
    if(user) res.status(200).json(user.username);
    else res.status(400).json({
        message: "Unknown"
    });
  });
  exports.deleteUser = asyncHandler(async ( req,res,next)=>{
    const id = req.params;
    const user = await Users.findById(id);
    if(user){
      if(user.role +"" !==""+ "Admin"){
        Users.splice(index,1);
        user.remove();
        res.status(200).json("User removed successfully!")  
      }
      else res.status(200).json("Can't remove admin!");
    } else{
      res.status(200).json("user doesn't exist");
    }
  });   
  exports.updateUser = asyncHandler(async (req,res,next)=>{
    const id = req.params;
    const {email, username, password, birthdate,role} = req.body;
    const user = await Users.findById(id);
    if(user){
      user.email = email ? email:undefined;
      //comment.text = text ? text : undefined;
      user.email= email ? email:undefined;
      user.username=username ? username:undefined;
      user.password=password ? password:undefined;
      user.birthdate= birthdate ? birthdate:undefined;
      user.role= role ? role:undefined;

      user.save();
      res.status(200).json("User info edited");
    }
    else{
      res.status(200).json("User doesn't exist");
    }
  }); 
