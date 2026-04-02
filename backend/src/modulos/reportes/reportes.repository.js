import pool from "../../config/db.js";

export const getTopVendidos = async (desde, hasta) => {
    const query = `
        SELECT p.nombre, p.id, SUM(m.cantidad) as total_vendido
        FROM movimientos_stock m
        JOIN productos p ON m.producto_id = p.id
        WHERE m.motivo = 'venta' AND m.creado_at BETWEEN $1 AND $2
        GROUP BY p.id, p.nombre
        ORDER BY total_vendido DESC
        LIMIT 10
    `;
    const { rows } = await pool.query(query, [desde, hasta]);
    return rows;
};

export const getMenosVendidos = async (desde, hasta) => {
    const query = `
       SELECT p.nombre, p.id, COALESCE(SUM(m.cantidad), 0) as total_vendido
       FROM productos p
       LEFT JOIN movimientos_stock m ON p.id = m.producto_id 
       AND m.motivo = 'venta' 
       AND m.creado_at BETWEEN $1 AND $2
       GROUP BY p.id, p.nombre
       ORDER BY total_vendido ASC
       LIMIT 10
    `;
    const { rows } = await pool.query(query, [desde, hasta]);
    return rows;
};

export const getAnalisisPerdidas = async (desde, hasta) => {
    const query = `
        SELECT 
            m.motivo, 
            COUNT(*) as cantidad_operaciones,
            SUM(m.cantidad) as total_unidades,
            SUM(m.cantidad * p.precio_costo) as costo_estimado
        FROM movimientos_stock m
        JOIN productos p ON m.producto_id = p.id
        WHERE m.creado_at BETWEEN $1 AND $2 
          AND (m.motivo = 'daño' OR (m.motivo = 'correccion' AND m.tipo IN ('salida', 'ajuste')))
        GROUP BY m.motivo
    `;
    const { rows } = await pool.query(query, [desde, hasta]);
    return rows;
};

export const getResumenMovimientos = async (desde, hasta, tipo, motivo) => {
    let query = `
        SELECT tipo, motivo, COUNT(*) as total_movimientos, SUM(cantidad) as total_unidades
        FROM movimientos_stock
        WHERE creado_at BETWEEN $1 AND $2
    `;
    const params = [desde, hasta];

    if (tipo) {
        params.push(tipo);
        query += ` AND tipo = $${params.length}`;
    }
    if (motivo) {
        params.push(motivo);
        query += ` AND motivo = $${params.length}`;
    }

    query += ` GROUP BY tipo, motivo ORDER BY tipo, motivo`;

    const { rows } = await pool.query(query, params);
    return rows;
};

export const getValorInventario = async () => {
    const query = `
        SELECT SUM(stock * precio_costo) as valor_total
        FROM productos
    `;
    const { rows } = await pool.query(query);
    return rows[0].valor_total || 0;
};
