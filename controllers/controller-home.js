const controllerHome = async (req, res) => {
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
    console.log("Error en el controllerHome: ", error.message);
    return res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

module.exports = {
  controllerHome,
};
