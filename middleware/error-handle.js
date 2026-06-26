const errorHandle = (err, req, res, next) => {
  console.error("Error capturado en el servidor: ", err.message);

  const statusCode = err.statusCode || 500;

  const message = err.message || "Error interno del servidor";
  return res.status(statusCode).json({
    ok: false,
    msg: message,
  });
};

module.exports = {
  errorHandle,
};
