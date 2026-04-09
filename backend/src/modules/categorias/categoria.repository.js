import pool from "../../config/db.js";

export const obtenerCategorias = async (filtros = {}) => {
    let sql = "SELECT * FROM categorias WHERE 1=1";
    if (filtros.inactivos === "true" || filtros.inactivos === "1") {
        sql += " AND activo = false";
    } else {
        sql += " AND activo = true";
    }
    const { rows } = await pool.query(sql);
    return rows;
}

export const obtenerCategoriaPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
    return rows[0];
}

export const crearCategoria = async (nombre) => {
    const { rows } = await pool.query("INSERT INTO categorias (nombre) VALUES ($1) RETURNING *", [nombre]);
    return rows[0];
}

export const actualizarCategoria = async (id, nombre) => {
    const { rows } = await pool.query("UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *", [nombre, id]);
    return rows[0];
}

export const eliminarCategoria = async (id) => {
    const { rows } = await pool.query("UPDATE categorias SET activo = false WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}

export const reactivarCategoria = async (id) => {
    const { rows } = await pool.query("UPDATE categorias SET activo = true WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}