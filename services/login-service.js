const { pool } = require("../config/database-config");

const registerLogin = async ({
  nameUser,
  lastnameUser,
  emailUser,
  passwordHash,
  roleUser,
}) => {
  try {
    const sql =
      "INSERT INTO user_business(nameUser,lastnameUser,emailUser,passwordUser,roleUser)VALUES(?,?,?,?,?)";
    const [rows] = await pool.execute(sql, [
      nameUser,
      lastnameUser,
      emailUser,
      passwordHash,
      roleUser,
    ]);
  } catch (error) {
    console.log("Error en el service-login: ", error.message);
    throw Error(error.message);
  }
};

const findEmail = async (email) => {
  try {
    const sql = "SELECT * FROM user_business WHERE emailUser = ?";
    const [rows] = await pool.execute(sql, [email]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log("Error en el service de findEmail: ", error.message);
    throw Error(error.message);
  }
};

module.exports = {
  findEmail,
  registerLogin,
};
