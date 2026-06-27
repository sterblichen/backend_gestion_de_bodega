const { pool } = require("../config/database-config");
const { handleDbError } = require("../utils/db-handle-error");

const registerLogin = async ({
  nameUser,
  lastnameUser,
  emailUser,
  passwordHash,
  roleUser,
}) => {
  try {
    const sql =
      "INSERT INTO user_business(nameUser,lastnameUser,emailUser,passwordUser,role_user_id)VALUES(?,?,?,?,?)";
    await pool.execute(sql, [
      nameUser,
      lastnameUser,
      emailUser,
      passwordHash,
      roleUser,
    ]);
    return true;
  } catch (error) {
    const translatedError = handleDbError(error);
    throw translatedError;
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
    const translatedError = handleDbError(error);
    throw translatedError;
  }
};

const roleUserPage = async () => {
  try {
    const sql = "SELECT * FROM role_user";
    const [rows] = await pool.execute(sql);
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    const translatedError = handleDbError(error);
    throw translatedError;
  }
};

const registerRoleUser = async ({ roleName }) => {
  try {
    const sql = "INSERT INTO role_user(roleName)VALUES(?)";
    const [rows] = await pool.execute(sql, [roleName]);
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    const translatedError = handleDbError(error);
    throw translatedError;
  }
};

module.exports = {
  findEmail,
  registerLogin,
  roleUserPage,
  registerRoleUser,
};
