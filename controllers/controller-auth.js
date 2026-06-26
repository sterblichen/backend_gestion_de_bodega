const {
  findEmail,
  registerLogin,
} = require("../services/login-service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const controllerRegister = async (req, res, next) => {
  try {
    const {
      nameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      roleUser,
    } = req.body;

    const emailVerify = await findEmail(emailUser);
    if (emailVerify) {
      const error = new Error("El email ya tiene una cuenta");
      error.statusCode = 400;
      throw error;
    }

    const passwordHash = await bcrypt.hash(passwordUser, 10);

    await registerLogin({
      nameUser,
      lastnameUser,
      emailUser,
      passwordHash,
      roleUser,
    });
    return res.status(201).json({
      ok: true,
      msg: "Creado con exito el usuario",
    });
  } catch (error) {
    next(error);
  }
};

const controllerLogin = async (req, res, next) => {
  try {
    const { emailUser, passwordUser } = req.body;

    const dataUser = await findEmail(emailUser);
    if (!dataUser) {
      const error = new Error("Credenciales incorrectas");
      error.statusCode = 400;
      throw error;
    }

    const passwordVerify = await bcrypt.compare(
      passwordUser,
      dataUser.passwordUser,
    );
    if (!passwordVerify) {
      const error = new Error("Credenciales incorrectas");
      error.statusCode = 400;
      throw error;
    }

    const payload = {
      id: dataUser.id,
      email: dataUser.emailUser,
      name: dataUser.nameUser,
      lstname: dataUser.lastnameUser,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    return res.status(200).json({
      ok: true,
      msg: "Inicio de Sesion",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  controllerRegister,
  controllerLogin,
};
