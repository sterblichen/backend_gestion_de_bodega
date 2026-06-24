const express = require("express");
const routeAuth = express.Router();
const {
  verifyLogin,
  verifyRegister,
} = require("../middleware/verify-login");
const {
  controllerRegister,
  controllerLogin,
} = require("../controllers/controller-auth");

routeAuth.post("/register", verifyRegister, controllerRegister);
routeAuth.post("/login", verifyLogin, controllerLogin);

module.exports = {
  routeAuth,
};
