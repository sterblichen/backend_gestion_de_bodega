const {
  registerSchme,
  loginSchema,
} = require("../schemas/loginBodySchema");

const verifyRegister = async (req, res, next) => {
  try {
    registerSchme.parse(req.body);
    next();
  } catch (error) {
    console.log("Error en verifyRegister: ", error.message);
    return res.status(401).json({
      ok: false,
      errors: error.issues.map((e) => e.message),
    });
  }
};

const verifyLogin = async (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    console.log("Error en verifyLogin: ", error.message);
    return res.status(401).json({
      ok: false,
      errors: error.issues.map((e) => e.message),
    });
  }
};

module.exports = {
  verifyLogin,
  verifyRegister,
};
