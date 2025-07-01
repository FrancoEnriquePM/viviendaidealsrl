const express = require("express");
const route = express.Router();
const reporteController = require("../Controllers/reporteController");

// Nueva ruta para el dashboard
route.get("/", (req, res) => {
  res.render("dashboard");
});

// 1. Reporte de Contratos (filtro por estado y cliente)
route.get("/reporte/contratos", reporteController.reporteContratos);

// 2. Reporte de Pagos Pendientes (filtro por mes y cliente)
route.get("/reporte/pagos", reporteController.reportePagosPendientes);

// 3. Reporte de Ingresos Mensuales (filtro por año y tipo de operación)
route.get("/reporte/ingresos", reporteController.reporteIngresosMensuales);

// 4. Reporte de Comisiones por Agente (filtro por nombre del agente)
route.get("/reporte/comisiones", reporteController.reporteComisionesAgentes);

// 5. Reporte de Visitas a Inmuebles (filtro por ciudad)
route.get("/reporte/visitas", reporteController.reporteVisitasInmuebles);

module.exports = route;
