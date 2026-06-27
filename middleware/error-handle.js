const errorHandle = (err, req, res, next) => {
  console.error(
    `Error capturado en el servidor => Origen =>  ${req.originalUrl}: `,
    err.message,
  );

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "Error interno del servidor" : err.message;

  return res.status(statusCode).json({
    ok: false,
    msg: message,
  });
};

module.exports = {
  errorHandle,
};
