import pool from "../../config/db.js";

export const ejecutarQuery = async (query) => {
    const { rows } = await pool.query(query);
    return rows;
}

export const obtenerProductos = async (filtros = {}) => {
    let sql = "SELECT * FROM productos WHERE 1=1";
    const values = [];

    if (filtros.nombre) {
        values.push(`%${filtros.nombre}%`);
        sql += ` AND nombre ILIKE $${values.length}`;
    }

    if (filtros.categoria_id) {
        values.push(filtros.categoria_id);
        sql += ` AND categoria_id = $${values.length}`;
    }

    sql += " ORDER BY id DESC";

    return await ejecutarQuery({ text: sql, values });
}

export const productoPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    return rows[0];
}

export const crearProducto = async (producto) => {
    const { rows } = await pool.query("INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *", [producto.nombre, producto.precio, producto.stock]);
    return rows[0];
}

export const actualizarProducto = async (id, producto) => {
    const { rows } = await pool.query("UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *", [producto.nombre, producto.precio, producto.stock, id]);
    return rows[0];
}

export const eliminarProducto = async (id) => {
    const { rows } = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}
