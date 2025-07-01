const db = require("../Config/db");

// 1. Contratos Activos y Vencidos
exports.reporteContratos = (estado, cliente, callback) => {
  const sql = "CALL sp_contratos_activos_vencidos(?, ?)";
  db.query(sql, [estado, cliente], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// 2. Pagos Pendientes
exports.obtenerPagosPendientes = (mes, cliente, callback) => {
  const sql = "CALL sp_pagos_pendientes(?, ?)";
  db.query(sql, [mes || null, cliente || null], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// 3. Ingresos Mensuales
exports.obtenerIngresosMensuales = (anio, tipoOperacion, callback) => {
  const sql = "CALL sp_ingresos_mensuales(?, ?)";
  db.query(sql, [anio || null, tipoOperacion || null], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// 4. Comisiones por Agente
exports.obtenerComisionesAgentes = (agenteNombre, callback) => {
  const sql = "CALL sp_comisiones_agentes(?)";
  db.query(sql, [agenteNombre || null], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// 5. Visitas a Inmuebles
exports.obtenerVisitasInmuebles = (ciudad, callback) => {
  const sql = "CALL sp_visitas_inmuebles(?)";
  db.query(sql, [ciudad || null], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};
