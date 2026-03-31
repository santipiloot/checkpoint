import pool from "../../config/db.js";

export const ejecutarQuery = async (query) => {
    const { rows } = await pool.query(query);
    return rows;
}

export const obtenerProductoPorCodigo = async (codigo_barras) => {
    const { rows } = await pool.query("SELECT * FROM productos WHERE codigo_barras = $1", [codigo_barras]);
    return rows[0];
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

    if (filtros.proveedor_id) {
        values.push(filtros.proveedor_id);
        sql += ` AND proveedor_id = $${values.length}`;
    }

    if (filtros.stock_critico === 'true' || filtros.stock_critico === true) {
        sql += " AND stock <= stock_minimo";
    }

    sql += " ORDER BY id DESC";

    return await ejecutarQuery({ text: sql, values });
}


export const productoPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    return rows[0];
}

export const crearProducto = async (producto) => {
    const { rows } = await pool.query(
        `INSERT INTO productos 
        (nombre, descripcion, codigo_barras, categoria_id, proveedor_id, precio_costo, stock, stock_minimo, stock_minimo_auto) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        [
            producto.nombre,
            producto.descripcion,
            producto.codigo_barras,
            producto.categoria_id,
            producto.proveedor_id,
            producto.precio_costo,
            producto.stock,
            producto.stock_minimo,
            producto.stock_minimo_auto
        ]
    );
    return rows[0];
}

export const actualizarProducto = async (id, producto) => {
    const { rows } = await pool.query(
        `UPDATE productos 
        SET nombre = $1, 
            descripcion = $2, 
            codigo_barras = $3, 
            categoria_id = $4, 
            proveedor_id = $5, 
            precio_costo = $6, 
            stock = $7, 
            stock_minimo = $8, 
            stock_minimo_auto = $9 
        WHERE id = $10 
        RETURNING *`,
        [
            producto.nombre,
            producto.descripcion || null,
            producto.codigo_barras || null,
            producto.categoria_id || null,
            producto.proveedor_id || null,
            producto.precio_costo || 0,
            producto.stock || 0,
            producto.stock_minimo || 0,
            producto.stock_minimo_auto || null,
            id
        ]
    );
    return rows[0];
}


export const eliminarProducto = async (id) => {
    const { rows } = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);
    return rows[0];
}

export const obtenerVentasUltimos30Dias = async (producto_id) => {
    const { rows } = await pool.query(
        `SELECT COALESCE(SUM(cantidad), 0) as total 
        FROM movimientos_stock 
        WHERE producto_id = $1 
          AND tipo = 'salida' 
          AND DATE(creado_at) >= CURRENT_DATE - INTERVAL '30 days'`,
        [producto_id]
    );
    return parseFloat(rows[0].total);
}
