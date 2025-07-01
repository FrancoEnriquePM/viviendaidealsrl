-- 1. Contratos Activos y Vencidos
-- 2. Pagos Pendientes por Cliente o Inmueble
-- 3. Ingresos Mensuales por tipo de operación
-- 4. Comisiones por agente
-- 5. Visitas a inmuebles

-- 1
DELIMITER //

CREATE PROCEDURE sp_contratos_activos_vencidos(
  IN estado_filtro VARCHAR(50),      -- Ej: 'activo', 'vencido'
  IN cliente_nombre VARCHAR(100)     -- Ej: '%Carlos%'
)
BEGIN
  SELECT 
    c.id, 
    tc.nombre AS tipo_contrato, 
    c.fecha_inicio, 
    c.fecha_fin, 
    ec.nombre AS estado_contrato, 
    cl.nombre AS cliente
  FROM Contrato c
  JOIN Cliente cl ON c.id_cliente = cl.id
  JOIN TipoContrato tc ON c.id_tipo = tc.id
  JOIN EstadoContrato ec ON c.id_estado = ec.id
  WHERE (estado_filtro IS NULL OR ec.nombre LIKE estado_filtro)
    AND (cliente_nombre IS NULL OR cl.nombre LIKE cliente_nombre);
END //

DELIMITER ;

-- 2
DELIMITER //

CREATE PROCEDURE sp_pagos_pendientes(
  IN mes_filtro INT,              -- Ej: 3 para marzo
  IN cliente_nombre VARCHAR(100)  -- Ej: '%Ana%'
)
BEGIN
  SELECT 
    cl.nombre, 
    i.direccion, 
    p.monto, 
    p.fecha
  FROM Pago p
  JOIN EstadoPago ep ON p.id_estado = ep.id
  JOIN Contrato c ON p.id_contrato = c.id
  JOIN Cliente cl ON c.id_cliente = cl.id
  JOIN Inmueble i ON c.id_inmueble = i.id
  WHERE ep.nombre = 'pendiente'
    AND (mes_filtro IS NULL OR MONTH(p.fecha) = mes_filtro)
    AND (cliente_nombre IS NULL OR cl.nombre LIKE cliente_nombre);
END //

DELIMITER ;

-- 3
DELIMITER //

CREATE PROCEDURE sp_ingresos_mensuales(
  IN anio_filtro INT,               -- Ej: 2025
  IN tipo_operacion VARCHAR(50)     -- Ej: 'alquiler'
)
BEGIN
  SELECT 
    tc.nombre AS tipo_operacion,
    YEAR(p.fecha) AS anio,
    MONTH(p.fecha) AS mes,
    SUM(p.monto) AS total
  FROM Pago p
  JOIN EstadoPago ep ON p.id_estado = ep.id
  JOIN Contrato c ON p.id_contrato = c.id
  JOIN TipoContrato tc ON c.id_tipo = tc.id
  WHERE ep.nombre = 'pagado'
    AND (anio_filtro IS NULL OR YEAR(p.fecha) = anio_filtro)
    AND (tipo_operacion IS NULL OR tc.nombre = tipo_operacion)
  GROUP BY tc.nombre, YEAR(p.fecha), MONTH(p.fecha);
END //

DELIMITER ;

-- 4
DELIMITER //

CREATE PROCEDURE sp_comisiones_agentes(
  IN agente_nombre VARCHAR(100)
)
BEGIN
  SELECT 
    a.nombre, 
    COUNT(c.id) AS contratos, 
    SUM(c.monto_total * a.porcentaje_comision / 100) AS comision_total
  FROM Contrato c
  JOIN Agente a ON c.id_agente = a.id
  WHERE (agente_nombre IS NULL OR a.nombre LIKE agente_nombre)
  GROUP BY a.id;
END //

DELIMITER ;

-- 5
DELIMITER //

CREATE PROCEDURE sp_visitas_inmuebles(
  IN ciudad_filtro VARCHAR(50)
)
BEGIN
  SELECT 
    i.direccion, 
    i.ciudad,
    COUNT(v.id) AS total_visitas
  FROM Visita v
  JOIN Inmueble i ON v.id_inmueble = i.id
  WHERE (ciudad_filtro IS NULL OR i.ciudad LIKE ciudad_filtro)
  GROUP BY i.id
  ORDER BY total_visitas DESC;
END //

DELIMITER ;