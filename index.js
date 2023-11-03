const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@tilincluster.xf0gs9f.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// import routes
const authRoutes = require("./routes/auth");
const validarToken = require("./routes/validateJWT");
const admin = require("./routes/admin");

// route middlewares
app.use("/api/admin", validarToken, admin);
app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
