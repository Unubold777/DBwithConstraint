let express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const LoginRoute = require("../routes/login");
const UsersRouts = require("../routes/user");
const ProductRoute = require("../routes/product");
const SupplierRoute = require("../routes/supplier");
const CategoryRoute = require("../routes/catetory");
const CartRoute = require("../routes//cart");

// const scheduler = require("./scheduler"); // устгаж болохгүй!!!
//uuganaaa
function initialize() {
  const app = express();
  app.use(morgan("dev"));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  app.use(
    express.json({
      limit: "50mb",
    })
  );
  app.use(
    express.urlencoded({
      limit: "50mb",
    })
  );
  app.use(
    helmet.hidePoweredBy(),
    helmet.noSniff(),
    helmet.xssFilter(),
    helmet.contentSecurityPolicy(),
    helmet.crossOriginEmbedderPolicy(),
    helmet.expectCt(),
    helmet.frameguard()
  );
  app.use(cors());
  app.use(express.json());

  app.use("/auth", LoginRoute);
  app.use("/user", UsersRouts);
  app.use("/product", ProductRoute);
  app.use("/category", CategoryRoute);
  app.use("/supplier", SupplierRoute);
  app.use("/cart", CartRoute);

  app.use("/public", express.static("public"));

  app.listen(process.env.PORT, function () {
    console.log("Server is ready at" + process.env.PORT);
  });
}

function close() {}

module.exports.initialize = initialize;
module.exports.close = close;