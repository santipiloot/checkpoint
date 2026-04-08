import pool from "../../config/db.js";

export const obtenerUsuarios = async () => {
    const query = "SELECT id, nombre, email, rol FROM usuarios WHERE activo = true";
    const res = await pool.query(query);
    return res.rows;
}

export const obtenerUsuario = async (id) => {
    const query = "SELECT id, nombre, email, rol FROM usuarios WHERE id = $1";
    const res = await pool.query(query, [id]);
    return res.rows[0];
}

export const editarUsuario = async (id, data) => {
    const { nombre, email, rol } = data;
    const query = "UPDATE usuarios SET nombre = $1, email = $2, rol = $3 WHERE id = $4 RETURNING *";
    const res = await pool.query(query, [nombre, email, rol, id]);
    return res.rows[0];
}

export const eliminarUsuario = async (id) => {
    const query = "UPDATE usuarios SET activo = false WHERE id = $1 RETURNING *";
    const res = await pool.query(query, [id]);
    return res.rows[0];
}
