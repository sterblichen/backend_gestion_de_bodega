const e = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_ERRORS = {
  TokenExpiredError: {
    status: 401,
    msg: "El tiempo de sesión expiró.",
  },
  JsonWebTokenError: {
    status: 401,
    msg: "Token inválido, alterado o corrupto.",
  },
  NotBeforeError: {
    status: 401,
    msg: "El token aún no está activo.",
  },
};

const jwtVerify = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      const error = new Error("No hay token de autorizacion");
      error.statusCode = 400;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    const knowError = JWT_ERRORS[error.name];
    if (knowError) {
      error.statusCode = knowError.status;
      error.message = knowError.msg;
    }
    next(error);
  }
};

module.exports = {
  jwtVerify,
};
