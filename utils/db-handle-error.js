const MYSQL_ERRORS = {
  ER_DUP_ENTRY: {
    status: 400,
    msg: "El registro ya existe. Verifica los datos duplicados (ej. Email o SKU).",
  },
  ER_NO_REFERENCED_ROW_2: {
    status: 400,
    msg: "Estás intentando usar una categoría o marca que no existe.",
  },
  ER_BAD_NULL_ERROR: {
    status: 400,
    msg: "Faltan datos obligatorios para la base de datos.",
  },
};

const handleDbError = (error) => {
  const knownError = MYSQL_ERRORS[error.code];

  if (knownError) {
    const customError = new Error(knownError.msg);
    customError.statusCode = knownError.status;
    return customError;
  }

  return error;
};

module.exports = { handleDbError };
