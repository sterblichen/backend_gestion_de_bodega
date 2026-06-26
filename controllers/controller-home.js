const controllerHome = async (req, res, next) => {
  try {
    const { id, email, name, lastname } = req.usuario;
    return res.status(200).json({
      ok: true,
      msg: "Bienvenido al home",
      data: {
        id: id,
        name: name,
        lastname: lastname,
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  controllerHome,
};
