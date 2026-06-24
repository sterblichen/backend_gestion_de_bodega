require("dotenv").config();
const cors = require("cors");
const { routeAuth } = require("./routes/route-auth");
const express = require("express");
const { routeHome } = require("./routes/route-home");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/", routeHome);

app.listen(process.env.SV_PORT, () => {
  console.log(
    `Servidor levantado en el puerto: http://localhost:${process.env.SV_PORT}`,
  );
});
