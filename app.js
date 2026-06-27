require("dotenv").config();
const cors = require("cors");
const { routeAuth } = require("./routes/route-auth");
const express = require("express");
const { routeHome } = require("./routes/route-home");
const { errorHandle } = require("./middleware/error-handle");
const app = express();
app.disable("x-powered-by");
const corsOption = {
  origin: "http://localhost:5173",
  optionSuccesStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/user", routeHome);

app.use(errorHandle);

app.listen(process.env.SV_PORT, () => {
  console.log(
    `Servidor levantado en el puerto: http://localhost:${process.env.SV_PORT}`,
  );
});
