const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const reporteRoutes = require("./Routes/rutas");

// Configurar motor EJS con ejs-mate
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "dashboard"); // por defecto buscará views/dashboard.ejs

// Middleware para archivos estáticos (bootstrap desde node_modules o carpeta pública)
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// Si tienes CSS o JS propio:
app.use("/public", express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", reporteRoutes);

// Puerto
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
