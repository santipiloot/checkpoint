import pool from '../../config/db.js';

export const crearUsuario = async (nombre, email, passwordHash, rol) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
        [nombre, email, passwordHash, rol]
    );
    return result.rows[0];
};

export const obtenerUsuarioPorEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return result.rows[0];
};
