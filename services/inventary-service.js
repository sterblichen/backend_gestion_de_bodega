const { pool } = require("../config/database-config");
const { handleDbError } = require("../utils/db-handle-error");

const categoriesAll = async () => {
  try {
    const sql = "SELECT * FROM categories";
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

const registerCategory = async ({ nameCategory }) => {
  try {
    const sql = "INSERT INTO categories(nameCategory)VALUES(?)";
    await pool.execute(sql, [nameCategory]);
    return true;
  } catch (error) {
    const translatedError = handleDbError(error);
    throw translatedError;
  }
};

const registerBrand = async ({ nameBrand }) => {
  try {
    const sql = "INSERT INTO brands(nameBrand)VALUES(?)";
    await pool.execute(sql, [nameBrand]);
    return true;
  } catch (error) {
    const translatedError = handleDbError(error);
    throw translatedError;
  }
};

const brandsAll = async () => {
  try {
    const sql = "SELECT * FROM brands";
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

module.exports = {
  categoriesAll,
  registerCategory,
  registerBrand,
  brandsAll,
};
