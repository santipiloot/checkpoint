import { pool } from "../../config/db.js";

export const obtenerCategorias = async () => {
    const { rows } = await pool.query("SELECT * FROM categorias");
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
    const { rows } = await pool.query("DELETE FROM categorias WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}