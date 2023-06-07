const jwt = require("jsonwebtoken");

const { Op, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/asyncHandler");
const logger = require("../services/logger").logger;
const Users = require("../model/user/Users");
const fs = require("fs");
const path = require("path");
// Users.sync({ force: true });

exports.createUser = asyncHandler(async (req, res, next) => {
  //Бүртгүүлэх хэсэг
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      message: "Талбар дутуу байна",
    });
  }

  await Users.findOne({
    where: {
      [Op.and]: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    },
  })
    .then(async (result) => {
      if (result == null) {
        const salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, salt);

        await Users.create({
          email: email,
          password: encryptedPassword,
          username: username,
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
// Нүүр зураг солих
// exports.uploadImageProfile = asyncHandler(async (req, res, next) => {
//   const id = req.userid;
//   const profile_image = req.body.profile_image;

//   if (!profile_image) {
//     return res.status(400).json({
//       success: false,
//       message: "Талбар дутуу байна",
//     });
//   }

//   await Users.findOne({
//     where: {
//       id: id,
//     },
//   })
//     .then((result) => {
//       if (result == null || result.length == 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Бүртэлгүй байна",
//         });
//       }

//       const filename = id + ".jpg";

//       const fileContents = new Buffer.from(profile_image, "base64");

//       fs.writeFile(
//         path.join(__dirname, "../public/" + "1.png"),
//         fileContents,
//         (err) => {
//           if (err) return console.error(err);

//           let relfilepath = "http://localhost:8050/public/image/" + filename;

//           Users.update(
//             { profile_image: relfilepath },
//             { where: { id: id } }
//           ).catch((err) => {
//             logger.error("Алдаа гарлаа: " + err);
//             return res.status(500).json({
//               success: false,
//               message: "Серверийн алдаа",
//             });
//           });
//           res.status(200).json({
//             success: true,
//             message: "Амжилттай нүүр зураг солилоо",
//             data: relfilepath,
//           });
//         }
//       );
//     })
//     .catch((err) => {
//       logger.error("Алдаа гарлаа: " + err);
//       return res.status(500).json({
//         success: false,
//         message: "Серверийн алдаа",
//       });
//     });
// });
