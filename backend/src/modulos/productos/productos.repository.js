import pool from "../../config/db.js";

export const obtenerProductos = async (query) => {
    const { rows } = await pool.query(query);
    return rows;
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
