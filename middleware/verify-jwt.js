const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtVerify = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw Error("No_exist_token");
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    console.log("Error en el jwtVerify: ", error.message);
    if (error.message === "No_exist_token") {
      return req.status(401).json({
        ok: false,
        msg: "No hay token en la peticion",
      });
    }
    return res.status(401).json({
      ok: false,
      msg: "Token expirado",
    });
  }
};

module.exports = {
  jwtVerify,
};
