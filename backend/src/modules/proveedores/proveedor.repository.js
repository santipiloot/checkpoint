import pool from "../../config/db.js";

export const obtenerProveedores = async () => {
    const { rows } = await pool.query("SELECT * FROM proveedores WHERE activo = true");
    return rows;
}

export const obtenerProveedorPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM proveedores WHERE id = $1", [id]);
    return rows[0];
}

export const crearProveedor = async (nombre, email, telefono, notas) => {
    const { rows } = await pool.query(
        "INSERT INTO proveedores (nombre, email, telefono, notas) VALUES ($1, $2, $3, $4) RETURNING *",
        [nombre, email || null, telefono || null, notas || null]
    );
    return rows[0];
}

export const actualizarProveedor = async (id, nombre, email, telefono, notas) => {
    const { rows } = await pool.query(
        "UPDATE proveedores SET nombre = $1, email = $2, telefono = $3, notas = $4 WHERE id = $5 RETURNING *",
        [nombre, email || null, telefono || null, notas || null, id]
    );
    return rows[0];
}

export const eliminarProveedor = async (id) => {
    const { rows } = await pool.query("UPDATE proveedores SET activo = false WHERE id = $1 RETURNING *", [id]);
    return rows;
}
