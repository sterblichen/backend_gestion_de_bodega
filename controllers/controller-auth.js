const {
  findEmail,
  registerLogin,
} = require("../services/login-service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const controllerRegister = async (req, res) => {
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
      throw new Error("Email_Exist");
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
    console.log("Error en el controller register: ", error.message);
    if (error.message === "Email_Exist") {
      return res.status(401).json({
        ok: false,
        msg: "El correo ya tiene una cuenta",
      });
    }
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

const controllerLogin = async (req, res) => {
  try {
    const { emailUser, passwordUser } = req.body;

    const dataUser = await findEmail(emailUser);
    if (!dataUser) {
      throw new Error("Incorrect_credentials");
    }

    const passwordVerify = await bcrypt.compare(
      passwordUser,
      dataUser.passwordUser,
    );
    if (!passwordVerify) {
      throw new Error("Incorrect_credentials");
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
    console.log("Error en el controllerLogin: ", error.message);
    if (error.message === "Incorrect_credentials") {
      return res.status(401).json({
        ok: false,
        msg: "Sus credenciales son incorrectas",
      });
    }
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  controllerRegister,
  controllerLogin,
};
