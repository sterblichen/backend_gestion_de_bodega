const expres = require("express");
const { jwtVerify } = require("../middleware/verify-jwt");
const { controllerHome } = require("../controllers/controller-home");
const routeHome = expres.Router();

routeHome.get("/user/home", jwtVerify, controllerHome);

module.exports = {
  routeHome,
};
