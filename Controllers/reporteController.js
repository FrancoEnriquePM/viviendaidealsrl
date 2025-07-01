const modelo = require("../Models/reportesModel");

// 1. Contratos (ya tenías esto)
exports.reporteContratos = (req, res) => {
  const { estado, cliente } = req.query;
  const estadoFiltrado = estado || null;
  const clienteFiltrado = cliente ? `%${cliente}%` : null;

  modelo.reporteContratos(estadoFiltrado, clienteFiltrado, (err, resultado) => {
    if (err) return res.status(500).send("Error al generar reporte");
    res.render("Contrato/contratos", { contratos: resultado });
  });
};

// 2. Pagos Pendientes
exports.reportePagosPendientes = (req, res) => {
  const { mes, cliente } = req.query;
  const mesFiltrado = mes || null;
  const clienteFiltrado = cliente ? `%${cliente}%` : null;

  modelo.obtenerPagosPendientes(
    mesFiltrado,
    clienteFiltrado,
    (err, resultado) => {
      if (err) return res.status(500).send("Error al generar reporte de pagos");
      res.render("Pago/pagos", { pagos: resultado });
    }
  );
};

// 3. Ingresos Mensuales
exports.reporteIngresosMensuales = (req, res) => {
  const { anio, tipo } = req.query;
  const anioFiltrado = anio || null;
  const tipoFiltrado = tipo || null;

  modelo.obtenerIngresosMensuales(
    anioFiltrado,
    tipoFiltrado,
    (err, resultado) => {
      if (err)
        return res.status(500).send("Error al generar ingresos mensuales");
      res.render("Pago/ingresos", { ingresos: resultado });
    }
  );
};

// 4. Comisiones por Agente
exports.reporteComisionesAgentes = (req, res) => {
  const { agente } = req.query;
  const agenteFiltrado = agente ? `%${agente}%` : null;

  modelo.obtenerComisionesAgentes(agenteFiltrado, (err, resultado) => {
    if (err) return res.status(500).send("Error al generar comisiones");
    res.render("Agente/comisiones", { comisiones: resultado });
  });
};

// 5. Visitas a Inmuebles
exports.reporteVisitasInmuebles = (req, res) => {
  const { ciudad } = req.query;
  const ciudadFiltrada = ciudad ? `%${ciudad}%` : null;

  modelo.obtenerVisitasInmuebles(ciudadFiltrada, (err, resultado) => {
    if (err) return res.status(500).send("Error al generar visitas");
    res.render("Visita/visitas", { visitas: resultado });
  });
};
