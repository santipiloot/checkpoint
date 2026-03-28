import pool from "../../config/db.js";

export const obtenerMovimientos = async (filtros = {}) => {
    let sql = `
        SELECT 
            m.*, 
            p.nombre as producto_nombre, 
            u.nombre as usuario_nombre
        FROM movimientos_stock m
        JOIN productos p ON m.producto_id = p.id
        JOIN usuarios u ON m.usuario_id = u.id
        WHERE 1=1
    `;
    const values = [];

    if (filtros.producto_id) {
        values.push(filtros.producto_id);
        sql += ` AND m.producto_id = $${values.length}`;
    }

    if (filtros.usuario_id) {
        values.push(filtros.usuario_id);
        sql += ` AND m.usuario_id = $${values.length}`;
    }

    if (filtros.tipo) {
        values.push(filtros.tipo);
        sql += ` AND m.tipo = $${values.length}`;
    }

    if (filtros.desde) {
        values.push(filtros.desde);
        sql += ` AND m.creado_at >= $${values.length}`;
    }

    if (filtros.hasta) {
        values.push(filtros.hasta);
        sql += ` AND m.creado_at <= $${values.length}`;
    }

    sql += " ORDER BY m.creado_at DESC";

    const { rows } = await pool.query(sql, values);
    return rows;
};

export const crearMovimiento = async (movimiento) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const resMovimiento = await client.query(
            `INSERT INTO movimientos_stock 
            (producto_id, usuario_id, cantidad, tipo, motivo, notas) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [
                movimiento.producto_id,
                movimiento.usuario_id,
                movimiento.cantidad,
                movimiento.tipo,
                movimiento.motivo,
                movimiento.notas || null
            ]
        );

        const verificacion = movimiento.tipo === 'salida' ? -movimiento.cantidad : movimiento.cantidad;

        await client.query(
            "UPDATE productos SET stock = stock + $1 WHERE id = $2",
            [verificacion, movimiento.producto_id]
        );

        await client.query('COMMIT');
        return resMovimiento.rows[0];

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
