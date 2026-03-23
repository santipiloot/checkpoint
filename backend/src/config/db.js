import pg from 'pg';

const { Pool } = pg;


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const testConexion = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexion exitosa a la base de datos. Hora del servidor:', res.rows[0].now);
    } catch (err) {
        console.error('Error conectando a la base de datos', err.message);
    }
};

export default pool;
