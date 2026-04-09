import * as productosRepository from "./productos.repository.js";
import calcularROP from "../../shared/utils/rop.js";

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

export const reactivarProducto = async (id) => {
    const productoReactivado = await productosRepository.reactivarProducto(id);

    if (!productoReactivado) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return productoReactivado;
};

export const calcularRopSugerido = async (id) => {
    const producto = await productosRepository.productoPorId(id);
    if (!producto) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 404;
        throw error;
    }

    const ventas30dias = await productosRepository.obtenerVentasUltimos30Dias(id);

    const consumoDiarioPromedio = ventas30dias / 30;
    // Usamos 30 dias porque es un estandar, 7 dias de cobertura para mas seguridad y 20% de factor de seguridad como un estandar en industria
    const ropSugerido = calcularROP(consumoDiarioPromedio, 7, 0.20);

    return {
        id: producto.id,
        nombre: producto.nombre,
        consumo_diario_promedio: consumoDiarioPromedio,
        rop_sugerido: ropSugerido
    };
};
