import * as productosRepository from "./productos.repository.js";

export const obtenerProductos = async (filtros) => {
    const productos = await productosRepository.obtenerProductos(filtros);
    return productos;
};

export const obtenerProductoPorCodigo = async (codigo_barras) => {
    const producto = await productosRepository.obtenerProductoPorCodigo(codigo_barras);
    if (!producto) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return producto;
};

export const obtenerProductoPorId = async (id) => {
    const producto = await productosRepository.productoPorId(id);
    if (!producto) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }
    return producto;
};

export const crearProducto = async (producto) => {
    const nuevoProducto = await productosRepository.crearProducto(producto);
    return nuevoProducto;
};

export const actualizarProducto = async (id, producto) => {
    const productoActualizado = await productosRepository.actualizarProducto(id, producto);

    if (!productoActualizado) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return productoActualizado;
};

export const eliminarProducto = async (id) => {
    const productoEliminado = await productosRepository.eliminarProducto(id);

    if (!productoEliminado) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return productoEliminado;
};
