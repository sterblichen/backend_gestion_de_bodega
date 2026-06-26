const express = require("express");
const routeAuth = express.Router();
const { validatorSchema } = require("../middleware/verify-login");
const {
  loginSchema,
  registerSchme,
} = require("../schemas/loginBodySchema");
const {
  controllerRegister,
  controllerLogin,
} = require("../controllers/controller-auth");

routeAuth.post(
  "/register",
  validatorSchema(registerSchme),
  controllerRegister,
);
routeAuth.post(
  "/login",
  validatorSchema(loginSchema),
  controllerLogin,
);

module.exports = {
  routeAuth,
};
