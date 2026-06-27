const expres = require("express");
const { jwtVerify } = require("../middleware/verify-jwt");
const { controllerHome } = require("../controllers/controller-home");
const {
  categoriesAll,
  registerCategory,
  registerBrand,
  brandsAll,
} = require("../services/inventary-service");
const {
  roleUserPage,
  registerRoleUser,
} = require("../services/login-service");
const { da } = require("zod/v4/locales");
const routeHome = expres.Router();

routeHome.get("/home", jwtVerify, controllerHome);
routeHome.get("/home/products/categories", async (req, res) => {
  const data = await brandsAll();
  res.status(200).json({
    ok: true,
    msg: data,
  });
});
module.exports = {
  routeHome,
};
