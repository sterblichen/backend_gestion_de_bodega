require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexion exitosa a la base de datos");
    connection.release();
  } catch (error) {
    console.log(
      "Error en la conexiona la base de datos: ",
      error.message,
    );
    process.exit(1);
  }
};

testConnection();

module.exports = {
  pool,
};
